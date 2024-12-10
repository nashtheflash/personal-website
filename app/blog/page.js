import { folderPaths, getBlogPostMetadata } from "@/lib/next-path"
import { MdxLayout } from "../components/blog"

export default function BlogHome() {

    return(
        <MdxLayout>
            <div className="min-h-[calc(100vh-64px-.75rem-.75rem)] bg-[#f2f1ed] w-full">
                <BlogList/>
            </div>
        </MdxLayout>
    )
}

async function BlogList() {
    const allArticals = folderPaths('app/blog/articals');
    const metadata = await getBlogPostMetadata('app/blog/articals', allArticals);

    return(
        <div className="not-prose grid grid-cols-3 gap-2 justify-items-center items-center w-full">
            {
                metadata.map((artical, i) => {
                    if(artical && artical.isActive) {
                        return (
                            <div key={i}>
                                <BlogCard 
                                    title={artical.title}
                                    artical={artical.folder}
                                />
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

function BlogCard({ title, artical }) {
    return(
        <a href={`/blog/articals${artical}`}>
            <div className="card bg-base-100 image-full w-full shadow-xl">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt={`${title} thumbnail`}
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{artical}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </a>
    )
}
