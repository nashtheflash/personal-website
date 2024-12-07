import { folderPaths } from "@/lib/next-path"
import { MdxLayout } from "../components/blog"

export default function BlogHome() {

    return(
        <MdxLayout>
            <div className="min-h-screen bg-[#f2f1ed] w-full">
                <h1>This is the blog homepage</h1>
                <BlogList/>
            </div>
        </MdxLayout>
    )
}

function BlogList() {
    const allArticals = folderPaths('app/blog/articals');

    return(
        <div className="not-prose grid grid-cols-3 gap-2 justify-items-center items-center w-full">
            {
                allArticals.map((artical, i) => (
                    <div key={i}>
                        <BlogCard artical={artical}/>
                    </div>
                ))

            }
        </div>
    )
}

function BlogCard({ artical }) {
    return(
        <a href={`/blog/articals${artical}`}>
            <div className="card bg-base-100 image-full w-full shadow-xl">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>{artical}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </a>
    )
}
