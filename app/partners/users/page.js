import { Suspense } from 'react';
import { cookies } from 'next/headers';

import { validateToken, getUserTenant } from '@/lib/firebase/tenant-auth';
import { getAllUsersForTenant } from '@/lib/firebase/firestore';

import { Users } from '@/components/pages';
import { SimpleSpinner } from "@/components/loading"

import { generateMetadata } from '@/lib/seo';
export const metadata = generateMetadata({
    title:"Users",
    description:"View User Information",
    keywords: []
});

export default async function UserPage() {
    const cookieStore = cookies();
    const idToken = cookieStore.get('idToken')?.value;


    let users = [];

    if (idToken) {
        try {
            const userInfo = await validateToken(idToken);
            const tenantId = await getUserTenant(userInfo.email);

            if (tenantId) {
                users = await getAllUsersForTenant(tenantId);
            }

        } catch (e) {
            // Not authenticated or no tenant
            users = [];
        }
    }

    return (
        <Suspense fallback={<SimpleSpinner/>}>
            <Users users={users} />
        </Suspense>
    );
}
