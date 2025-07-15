'use client'

import { useAuth } from './auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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