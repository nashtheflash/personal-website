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
    
    // Handle case where no articles are found
    if (!allArticals || allArticals.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No articles found in directory</h2>
                <p className="text-gray-600">Please check back later for new content.</p>
            </div>
        );
    }
    
    const metadata = await getBlogPostMetadata('app/blog/articles', allArticals)
    
    // Handle case where no metadata is found
    if (!metadata || metadata.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No article metadata found</h2>
                <p className="text-gray-600">Please check back later for new content.</p>
            </div>
        );
    }
    
    const activeArticalMetadata = metadata.filter((article) => article.isActive)
    
    // Handle case where no active articles are found
    if (!activeArticalMetadata || activeArticalMetadata.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No active articles found</h2>
                <p className="text-gray-600">Please check back later for new content.</p>
            </div>
        );
    }
    
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
        <div 
            className={`not-prose grid grid-cols-1 sm:grid-cols-4 gap-2 justify-items-center items-center w-full p-2`}
            style={{ 
                gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
                minHeight: `calc(${gridHeight}vh - 64px)`
            }}
        >
            {
                orderedArticals && orderedArticals.length > 0 ? orderedArticals.map((article, i) => {
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
                }) : (
                    <div className="col-span-full flex flex-col items-center justify-center min-h-96">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">No articles available</h2>
                        <p className="text-gray-600">Please check back later for new content.</p>
                    </div>
                )
            }
        </div>
    )
}

const getGridDems = (gridItems) => {
    if (!gridItems || gridItems.length === 0) {
        return { 
            gridHeight: 80, 
            gridRows: 3 
        };
    }
    
    const blocks = Math.ceil(gridItems.length / 4);
    const gridHeight = blocks * 80;
    const gridRows = blocks * 3;

    console.log(gridHeight);

    return { 
        gridHeight: gridHeight, 
        gridRows: gridRows 
    }
}

// function getSize(index) {
//     if(index == 0) return 'col-span-1 sm:col-span-3'
//     if(index == 1) return 'col-span-1 sm:col-span-1'
//     if(index % 2 == 0) return 'col-span-1 sm:col-span-2'
//     if(index % 3 == 0) return 'col-span-1'
// }


function sortByClosestPublishedDate(posts) {
    if (!posts || posts.length === 0) {
        return [];
    }
    
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

