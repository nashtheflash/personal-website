import { pathname } from 'next-extra/pathname';
import { getSingleBlogPostMetadata } from "@/lib/next-path"
import { incrementContentDocumentField } from '@/lib/firebase/firestore';

export default async function MDXPage({ children }) {
    const route = await pathname();

    //If there is a partner listed in the page metadata inclement the page count in firebase
    await incrementPageCounter(route);

    return (
        <div className="grid grid-cols-1 justify-items-stretch w-full min-h-[calc(100vh-64px)] text-gray-900">
            {children}
        </div>
    )
}

//Could be refactored for more pages but i dont see this being used elseweare
async function incrementPageCounter(route) {
    const routeArray = route.split('/');
    const contentId = routeArray.pop();

    // /blog/articles/... if there are 2 or fewer items in the array it is not a post
    if (routeArray.length <= 2 ) return;

    const { partners } = await getSingleBlogPostMetadata(route);

    // if artical has no partners array in the metadata return
    if (!partners) return;

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
