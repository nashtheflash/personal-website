"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { auth } from "@/firebase"

const AuthContext = createContext()

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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false) // Start as false for optimistic loading
  const [initialized, setInitialized] = useState(false)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    // Immediately try to get cached user data
    const cachedUser = getLocalStorageItem('firebase:authUser')
    if (cachedUser) {
      try {
        const parsedUser = JSON.parse(cachedUser)
        setUser(parsedUser)
        // Don't set loading to true if we have cached data
        setLoading(false)
      } catch (error) {
        console.error('Error parsing cached user:', error)
        if (typeof window !== 'undefined') {
          localStorage.removeItem('firebase:authUser')
        }
        setLoading(true) // Only load if no valid cache
      }
    } else {
      setLoading(true) // Only load if no cache exists
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
      setInitialized(true)
      setAuthError(null)
      
      // Cache the user data for faster subsequent loads
      if (user) {
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('firebase:authUser', JSON.stringify({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified
            }))
          }
        } catch (error) {
          console.error('Error caching user data:', error)
        }
      } else {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('firebase:authUser')
        }
      }
    }, (error) => {
      console.error('Auth state change error:', error)
      setLoading(false)
      setInitialized(true)
      setAuthError(error)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('firebase:authUser')
      }
    })

    return () => unsubscribe()
  }, [])

  // Provide a more granular loading state
  const isInitializing = !initialized && loading
  const isAuthenticating = initialized && loading

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading: isInitializing || isAuthenticating,
      isInitializing,
      isAuthenticating,
      initialized,
      authError,
      // User is authenticated if we have a real user from Firebase
      // OR if we have cached data and haven't finished initializing yet
      isAuthenticated: !!user || (!!getLocalStorageItem('firebase:authUser') && !initialized)
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
