'use client'

import { useServerAuth } from '@/lib/firebase/auth-hooks';
import { AdminDashboard, ClientDashboard } from "@/app/components/general";
import { RequireAuth } from '@/app/components/auth';
import { NoTenantAccess } from '@/app/components/auth/no-tenant-access';

export function PartnerDashboard({tenantData, tenantVideos, tenantArticles}) {
    const { serverTenant, isValidating, isValidated } = useServerAuth();

    // Show loading while validating
    if (isValidating) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        )
    }

    // Show admin dashboard for admin users (tenant ID 0)
    if(serverTenant?.id == 0){
        return (
            <div className="min-h-screen">
                <RequireAuth>
                    <AdminDashboard />
                </RequireAuth>
            </div>
        )
    }

    // Show client dashboard for users with valid tenant data
    if(tenantData && tenantVideos && tenantArticles && serverTenant){
        return (
            <div className="min-h-screen">
                <RequireAuth>
                    <ClientDashboard tenantData={tenantData} tenantVideos={tenantVideos} tenantArticles={tenantArticles} /> 
                </RequireAuth>
            </div>
        )
    }

    // Show no tenant access for authenticated users without tenant assignment
    if (isValidated && !serverTenant) {
        return <NoTenantAccess />
    }

    // Fallback for other cases
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Loading...</h1>
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        </div>
    )
}
