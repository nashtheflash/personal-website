'use client'

import { useServerAuth } from '@/lib/firebase/auth-hooks';
import { AdminDashboard, ClientDashboard } from "@/app/components/general";
import { RequireAuth } from '@/app/components/auth';

export function PartnerDashboard({tenantData, tenantVideos, tenantArticles}) {
    const { serverTenant } = useServerAuth();

    if(serverTenant?.id == 0){
        return (
            <div className="min-h-screen">
                <RequireAuth>
                    <AdminDashboard />
                </RequireAuth>
            </div>
        )
    }

    if(tenantData && tenantVideos && tenantArticles){
        return (
            <div className="min-h-screen">
                <RequireAuth>
                    <ClientDashboard tenantData={tenantData} tenantVideos={tenantVideos} tenantArticles={tenantArticles} /> 
                </RequireAuth>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <h1>NO ADMIN TENENAT OR CLIENT DATA {tenantData} --- {tenantVideos} --- {tenantArticles}</h1>
        </div>
    )
}

function Loading() {
    return <h2>Client Loading...</h2>;
}
