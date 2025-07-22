'use client'

import { useAuth } from '@/lib/firebase/auth-context';
import { useServerAuth } from '@/lib/firebase/auth-hooks';

import { AdminDashboard } from "@/app/components/general";
import { ClientDashboard } from "@/app/components/general";

export default function Dashboard() {
    const { user, loading } = useAuth();
    const { serverUser, serverTenant, isValidated, hasValidTenant, error } = useServerAuth();


    if (loading || !isValidated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading Dashboard</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
                    <p className="text-gray-600">Please log in to access the tenant dashboard.</p>
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

    if(serverTenant?.id == 0){
        return (
            <div className="min-h-screen">
                <AdminDashboard />
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <ClientDashboard  /> 
        </div>
    )
}


// export default withAuth(Dashboard)
