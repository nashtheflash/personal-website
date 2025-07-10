import { HashBrownsLoader } from './hash-browns-loader'

export function AuthLoader({ isInitializing = false, isAuthenticating = false }) {
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HashBrownsLoader 
          loadingText="Initializing..." 
          color="white" 
        />
      </div>
    )
  }

  if (isAuthenticating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HashBrownsLoader 
          loadingText="Checking authentication..." 
          color="white" 
        />
      </div>
    )
  }

  return null
} 