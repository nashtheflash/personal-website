import { folderPaths, getBlogPostMetadata } from "@/lib/next-path"
import { MdxLayout, BlogCard } from "../components/blog"
import { generateMetadata } from '@/utils';

export const metadata = generateMetadata({
    title:"Blog",
    description:"All Blog Articals",
    keywords: ['Projects', 'Art', 'Outdoor', 'Travel', 'Blog', 'Alaska', 'Nash Bostwick']
});

export default function BlogHome() {

    return(
        <MdxLayout>
            <div className="bg-[#f2f1ed] w-full">
                <BlogList/>
            </div>
        </MdxLayout>
    )
}

async function BlogList() {
    const allArticals = folderPaths('app/blog/articles');
    const metadata = await getBlogPostMetadata('app/blog/articles', allArticals)
    const activeArticalMetadata = metadata.filter((article) => article.isActive)
    const orderedArticals = sortByClosestPublishedDate(activeArticalMetadata)

    return(
        <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-2 justify-items-center items-center w-full">
            {
                orderedArticals.map((article, i) => {
                    return (
                        <div key={i} className={`relative h-full w-full min-h-[500px] ${getSize(i)}`}>
                            <a href={`/blog/articles${article.folder}`}>
                                <BlogCard 
                                    title={article.title}
                                    thumbnail={article.thumbnail}
                                />
                            </a>
                        </div>
                    )
                })
            }
        </div>
    )
}


function getSize(index) {
    if(index == 0) return 'col-span-1 sm:col-span-3'
    if(index == 1) return 'col-span-1 sm:col-span-1'
    if(index % 2 == 0) return 'col-span-1 sm:col-span-2'
    if(index % 3 == 0) return 'col-span-1'
}


function sortByClosestPublishedDate(posts) {
    return posts.sort((a, b) => {
        const today = new Date();

        // Ensure proper parsing of YYYY-MM-DD format
        const dateA = parseDate(a.published);
        const dateB = parseDate(b.published);

        // Sort by closest to today
        return Math.abs(dateA - today) - Math.abs(dateB - today);
    });
}

function parseDate(dateStr) {
    // Ensure YYYY-MM-DD format is correctly parsed
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day); // Month is 0-based in JS Date
}

