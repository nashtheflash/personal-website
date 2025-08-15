'use client'

import { useServerAuth } from '@/lib/firebase/auth-hooks';
import { AdminDashboard, ClientDashboard } from "@/components/general";
import { RequireAuth } from '@/components/auth';
import { SimpleSpinner } from '@/components/loading';
import { NoTenantAccess } from '@/components/auth/no-tenant-access';

export function PartnerDashboard({tenantData, tenantVideos, tenantArticles}) {
    const { serverTenant } = useServerAuth();

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
    if(tenantData && tenantVideos && tenantArticles){
        return (
            <div className="min-h-screen">
                <RequireAuth>
                    <ClientDashboard tenantData={tenantData} tenantVideos={tenantVideos} tenantArticles={tenantArticles} /> 
                </RequireAuth>
            </div>
        )
    }

    // Fallback for other cases
    return (
        <SimpleSpinner />
    )
}
