'use client'

import { useServerAuth } from '@/lib/firebase/auth-hooks';

import { AdminDashboard } from "@/app/components/general";
import { ClientDashboard } from "@/app/components/general";

export default function Dashboard() {
    const { serverTenant } = useServerAuth();

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
