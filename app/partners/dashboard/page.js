import { Suspense } from 'react';
import { cookies } from 'next/headers';

import { validateToken, getUserTenant } from '@/lib/firebase/tenant-auth';
import { getTenantContent } from '@/lib/firebase/firestore';
import { getTenantServer } from '@/lib/firebase/firestore/tenants';

import { PartnerDashboard } from '@/app/components/pages';
import { SimpleSpinner } from "@/app/components/loading"

import { generateMetadata } from '@/utils';
export const metadata = generateMetadata({
    title:"Dashboard",
    description:"Nash Browns Partner Login Page",
    keywords: ['Nash Browns', 'Nash', 'Browns', 'Login']
});

export default async function Partners() {
    const cookieStore = cookies();
    const idToken = cookieStore.get('idToken')?.value;

    let tenantData;
    let tenantVideos;
    let tenantArticles;

    if (idToken) {
        try {
            const userInfo = await validateToken(idToken);
            const tenantId = await getUserTenant(userInfo.email);

            if (!tenantId) throw new Error('Tenant not found');


            if (tenantId && tenantId != 0) {
                const tenantQuery = getTenantServer(tenantId);
                const contentQuery = getTenantContent(tenantId);

                const [tenant, content] = await Promise.all([tenantQuery, contentQuery]);

                const {videos, articles} = separateByType(content);

                tenantData = JSON.stringify(tenant);
                tenantVideos = JSON.stringify(videos);
                tenantArticles = JSON.stringify(articles);

            }
        } catch (e) {
            // Not authenticated or no tenant
            console.log('Error fetching dashboard data:', e);
        }
    }

    return(
        <Suspense fallback={<SimpleSpinner/>}>
            <PartnerDashboard tenantData={tenantData} tenantVideos={tenantVideos} tenantArticles={tenantArticles}/>
        </Suspense>
    )
}

function separateByType(items) {
    const videos = [];
    const articles = [];

    for (const item of items) {
        if (item.type === 'video') {
            videos.push(item);
        } else if (item.type === 'blog') {
            articles.push(item);
        }
    }

    // Sort videos by published_at in descending order (most recent first)
    videos.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

    // Sort articles by published_at in descending order (most recent first)
    articles.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

    return { videos, articles };
}
