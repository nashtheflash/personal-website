import { pathname } from 'next-extra/pathname';
import { getSingleBlogPostMetadata } from "@/lib/next-path"
import { incrementContentDocumentField } from '@/lib/firebase/firestore';
import { generateJsonLd } from '@/lib/seo';
import { AddBackground } from '@/components/styles';
import { Footer } from '@/components/blog';
import { JsonLd } from '@/components/seo';

export default async function MDXPage({ children }) {
    const route = await pathname();

    // Only article routes (/blog/articles/<slug>) carry postMetadata. Anything with
    // 3 or fewer segments (e.g. /blog, /blog/articles) is a listing page, not a post.
    const isPost = route.split('/').length > 3;
    const postMetadata = isPost ? await getSingleBlogPostMetadata(route) : null;

    //If there is a partner listed in the page metadata inclement the page count in firebase
    await incrementPageCounter(route, postMetadata);

    // Emit schema.org BlogPosting structured data for every article automatically.
    const jsonLd = postMetadata?.title
        ? generateJsonLd({ ...postMetadata, url: route })
        : null;

    return (
        <>
            {jsonLd && <JsonLd schema={jsonLd} />}
            <AddBackground>
                <div className="grid grid-cols-1 justify-items-stretch w-full min-h-[calc(100vh-64px)] text-gray-900">
                    {children}
                </div>
            </AddBackground>
            <Footer/>
        </>
    )
}

//Could be refactored for more pages but i dont see this being used elseweare
async function incrementPageCounter(route, postMetadata) {
    // if artical has no partners array in the metadata return
    if (!postMetadata?.partners) return;

    const contentId = route.split('/').pop();

    try {
        
        const result = await incrementContentDocumentField({
            contentId: contentId,
            incrementAmount: 1,
            fields: ['views'],
        })

        if (!result) throw new Error('failed to increment page counter');

        return true;

    } catch (error) {
        console.log('Error incrementing page counter:', error);
    }
}
