'use client'

import { useAuth } from '@/lib/firebase/auth-context';
import { useServerAuth } from '@/lib/firebase/auth-hooks';
import { useState, useEffect } from 'react';

export function RequireAuth({ children }) {
    const start = performance.now();
    const { user, loading } = useAuth();
    const { serverUser, serverTenant, isValidated, hasValidTenant, error } = useServerAuth();
    const [timeoutError, setTimeoutError] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading || !isValidated) {
                setTimeoutError(true);
            }
        }, 10000); // 10 seconds timeout

        return () => clearTimeout(timer);
    }, [loading, isValidated]);

    // Reset timeout error when loading completes
    useEffect(() => {
        if (!loading && isValidated) {
            setTimeoutError(false);
        }
    }, [loading, isValidated]);

    if (timeoutError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Timeout</h2>
                    <p className="text-gray-600 mb-4">
                        Authentication is taking longer than expected. Please try refreshing the page.
                    </p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }

    if (loading || !isValidated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
                    <p className="text-gray-600">Please log in to access this page.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!hasValidTenant) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-orange-600 mb-4">No Tenant Access</h2>
                    <p className="text-gray-600 mb-4">
                        Your account ({serverUser?.email}) is not associated with any tenant.
                    </p>
                    <p className="text-sm text-gray-500">
                        Contact your administrator to get tenant access.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {children}
        </div>
    )
}


// export default withAuth(Dashboard)

