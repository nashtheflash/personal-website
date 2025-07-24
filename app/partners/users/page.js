import { generateMetadata } from '@/utils';
import { Suspense } from 'react';
import { Users } from '@/app/components/pages';
import { cookies } from 'next/headers';
import { validateToken, getUserTenant } from '@/lib/firebase/tenant-auth';
import { getAllUsersForTenant } from '@/lib/firebase/firestore';

export const metadata = generateMetadata({
    title:"Users",
    description:"Nash Browns Partner Login Page",
    keywords: ['Nash Browns', 'Nash', 'Browns', 'Login']
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
        <Suspense fallback={<Loading />}>
            <Users users={users} />
        </Suspense>
    );
}

function Loading() {
  return <h2>Loading...</h2>;
}
