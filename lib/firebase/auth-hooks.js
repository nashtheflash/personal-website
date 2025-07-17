'use client'

import { useAuth } from './auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { auth } from '@/firebase'

// Helper function to safely access localStorage
const getLocalStorageItem = (key) => {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error('Error accessing localStorage:', error)
      return null
    }
  }
  return null
}

// Hook for protected routes with automatic redirect
export function useProtectedRoute(redirectTo = '/partners') {
  const { user, loading, isInitializing, isAuthenticating, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if we're sure user is not authenticated
    if (!loading && !isAuthenticated) {
      router.replace(redirectTo)
    }
  }, [isAuthenticated, loading, router, redirectTo])

  return {
    user,
    loading: isInitializing || isAuthenticating,
    isInitializing,
    isAuthenticating,
    isAuthenticated
  }
}

// Hook for conditional rendering based on auth state
export function useAuthCondition(condition) {
  const { user, loading, isAuthenticated } = useAuth()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // Assume auth will work if we have cached data
    if (!loading || isAuthenticated) {
      setShouldRender(condition(user))
    }
  }, [user, loading, condition, isAuthenticated])

  return {
    shouldRender,
    user,
    loading
  }
}

// Hook for optimistic auth state (uses cached data first)
export function useOptimisticAuth() {
  const { user, loading, isInitializing, isAuthenticating, isAuthenticated } = useAuth()
  const [optimisticUser, setOptimisticUser] = useState(null)

  useEffect(() => {
    // If we have a cached user, show it immediately
    if (!optimisticUser && user) {
      setOptimisticUser(user)
    }
    
    // If no user and not loading, clear optimistic state
    if (!user && !loading && !isAuthenticated) {
      setOptimisticUser(null)
    }
  }, [user, loading, isAuthenticated, optimisticUser])

  return {
    user: optimisticUser || user,
    loading: isInitializing || isAuthenticating,
    isInitializing,
    isAuthenticating,
    isOptimistic: !!optimisticUser && !user,
    isAuthenticated
  }
}

// Aggressive optimistic auth - assumes auth will work until proven otherwise
export function useAggressiveAuth() {
  const { user, loading, isAuthenticated, authError } = useAuth()
  const [assumedUser, setAssumedUser] = useState(null)

  useEffect(() => {
    // If we have cached data, assume it's valid
    const cachedUser = getLocalStorageItem('firebase:authUser')
    if (cachedUser && !assumedUser) {
      try {
        const parsedUser = JSON.parse(cachedUser)
        setAssumedUser(parsedUser)
      } catch (error) {
        console.error('Error parsing cached user:', error)
      }
    }

    // Clear assumed user if Firebase explicitly says no auth (user is null and not loading)
    if (user === null && !loading && !isAuthenticated) {
      setAssumedUser(null)
    }

    // Update with real user data when available
    if (user) {
      setAssumedUser(user)
    }
  }, [user, loading, isAuthenticated, assumedUser])

  return {
    user: user || assumedUser,
    loading: loading && !assumedUser, // Don't show loading if we have assumed user
    isAssumed: !!assumedUser && !user,
    isAuthenticated: !!user || !!assumedUser,
    hasError: !!authError
  }
}

/**
 * Hook to get current user's ID token
 * @returns {string|null} Firebase ID token or null
 */
export function useIdToken() {
  const [idToken, setIdToken] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && typeof user.getIdToken === 'function') {
      // This is a real Firebase user object
      user.getIdToken()
        .then(token => setIdToken(token))
        .catch(error => {
          console.error('Error getting ID token:', error);
          setIdToken(null);
        });
    } else if (user && user.uid) {
      // This might be a cached user object, try to get the real user
      const currentUser = auth.currentUser;
      if (currentUser && typeof currentUser.getIdToken === 'function') {
        currentUser.getIdToken()
          .then(token => setIdToken(token))
          .catch(error => {
            console.error('Error getting ID token:', error);
            setIdToken(null);
          });
      } else {
        setIdToken(null);
      }
    } else {
      setIdToken(null);
    }
  }, [user]);

  return idToken;
}

/**
 * Hook to validate user authentication with server
 * @returns {Object} Validation state and functions
 */
export function useServerAuth() {
  const [validationState, setValidationState] = useState({
    isValidating: false,
    isValidated: false,
    serverUser: null,
    serverTenant: null,
    error: null
  });

  const { user } = useAuth();
  const idToken = useIdToken();

  const validateWithServer = async () => {
    if (!idToken) {
      setValidationState(prev => ({
        ...prev,
        error: 'No ID token available'
      }));
      return;
    }

    setValidationState(prev => ({
      ...prev,
      isValidating: true,
      error: null
    }));

    try {
      const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setValidationState({
          isValidating: false,
          isValidated: true,
          serverUser: data.user,
          serverTenant: data.tenant,
          error: null
        });
      } else {
        setValidationState({
          isValidating: false,
          isValidated: false,
          serverUser: null,
          serverTenant: null,
          error: data.error
        });
      }
    } catch (error) {
      setValidationState({
        isValidating: false,
        isValidated: false,
        serverUser: null,
        serverTenant: null,
        error: 'Network error during validation'
      });
    }
  };

  // Auto-validate when user or token changes
  useEffect(() => {
    if (user && idToken) {
      validateWithServer();
    } else {
      setValidationState({
        isValidating: false,
        isValidated: false,
        serverUser: null,
        serverTenant: null,
        error: null
      });
    }
  }, [user, idToken]);

  return {
    ...validationState,
    validateWithServer,
    hasValidTenant: validationState.isValidated && !!validationState.serverTenant
  };
}

/**
 * Hook to make authenticated API calls with tenant context
 * @returns {Function} Function to make authenticated API calls
 */
export function useAuthenticatedApi() {
  const idToken = useIdToken();

  const makeAuthenticatedRequest = async (url, options = {}) => {
    if (!idToken) {
      throw new Error('No authentication token available');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return makeAuthenticatedRequest;
} 
