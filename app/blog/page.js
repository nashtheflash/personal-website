import { folderPaths, getBlogPostMetadata } from "@/lib/next-path"
import { MdxLayout, BlogCard } from "../components/blog"

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
    const allArticals = folderPaths('app/blog/articals');
    const metadata = await getBlogPostMetadata('app/blog/articals', allArticals)
    const activeArticalMetadata = metadata.filter((artical) => artical.isActive)

    return(
        <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-2 justify-items-center items-center w-full">
            {
                activeArticalMetadata.map((artical, i) => {
                    return (
                        <div key={i} className={`relative h-full w-full min-h-[500px] ${getSize(i)}`}>
                            <a href={`/blog/articals${artical.folder}`}>
                                <BlogCard 
                                    title={artical.title}
                                    thumbnail={artical.thumbnail}
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
