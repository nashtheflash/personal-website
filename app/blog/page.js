import Link from 'next/link';
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
        <div className='prose-lg flex flex-col justify-self-center items-start w-full sm:px-0 text-gray-600'> 
            <BlogList/>
        </div>
    )
}

async function BlogList() {
    const allArticals = folderPaths('app/blog/articles');
    const metadata = await getBlogPostMetadata('app/blog/articles', allArticals)
    const activeArticalMetadata = metadata.filter((article) => article.isActive)
    const orderedArticals = sortByClosestPublishedDate(activeArticalMetadata)

    //LOLOLOLOLOLOL
    const gridItemTemplate = [
        'sm:col-span-2 sm:row-span-3',
        'sm:col-span-2 sm:row-span-1',
        'sm:col-span-1 sm:row-span-2',
        'sm:col-span-1 sm:row-span-2',

        'sm:col-span-2 sm:row-span-1',
        'sm:col-span-2 sm:row-span-3',
        'sm:col-span-1 sm:row-span-2',
        'sm:col-span-1 sm:row-span-2',

        'sm:col-span-2 sm:row-span-3',
        'sm:col-span-2 sm:row-span-1',
        'sm:col-span-1 sm:row-span-2',
        'sm:col-span-1 sm:row-span-2',

        'sm:col-span-2 sm:row-span-1',
        'sm:col-span-2 sm:row-span-3',
        'sm:col-span-1 sm:row-span-2',
        'sm:col-span-1 sm:row-span-2',

        'sm:col-span-2 sm:row-span-3',
        'sm:col-span-2 sm:row-span-1',
        'sm:col-span-1 sm:row-span-2',
        'sm:col-span-1 sm:row-span-2',

        'sm:col-span-2 sm:row-span-1',
        'sm:col-span-2 sm:row-span-3',
        'sm:col-span-1 sm:row-span-2',
        'sm:col-span-1 sm:row-span-2',

        'sm:col-span-2 sm:row-span-3',
        'sm:col-span-2 sm:row-span-1',
        'sm:col-span-1 sm:row-span-2',
        'sm:col-span-1 sm:row-span-2',

        'sm:col-span-2 sm:row-span-1',
        'sm:col-span-2 sm:row-span-3',
        'sm:col-span-1 sm:row-span-2',
        'sm:col-span-1 sm:row-span-2',
    ]
    


    const { gridHeight, gridRows } = getGridDems(orderedArticals);



    return(
        <div className={`not-prose grid grid-cols-1 ${gridRows} sm:grid-cols-4 gap-2 justify-items-center items-center w-full ${gridHeight} p-2`}>
            {
                orderedArticals.map((article, i) => {
                    console.log('ARTICAL', article);

                    return (
                        <div key={i} className={`relative h-full w-full col-span-1 row-span-1 min-h-80 sm:min-h-0 ${gridItemTemplate[i]}`}>
                            <Link href={`/blog/articles${article.folder}`}>
                                <BlogCard 
                                    title={article.title}
                                    thumbnail={article.thumbnailIllustration ? article.thumbnailIllustration : article.thumbnail}
                                />
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

const getGridDems = (gridItems) => {
    const blocks = Math.ceil(gridItems.length / 4);
    const gridHeight = blocks * 80;
    const gridRows = blocks * 3;

    return { gridHeight: `min-h-[calc(${gridHeight}vh-64px)]`, gridRows: `grid-rows-${gridRows}` }
}

// function getSize(index) {
//     if(index == 0) return 'col-span-1 sm:col-span-3'
//     if(index == 1) return 'col-span-1 sm:col-span-1'
//     if(index % 2 == 0) return 'col-span-1 sm:col-span-2'
//     if(index % 3 == 0) return 'col-span-1'
// }


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

