import { readFiles } from "@/lib/next-path"
import { MdxLayout, ArtNav, ArtCollection } from "../components/blog"
import { getMyUnsplashCollections } from "../server-actions/unsplash";

export default async function ArtHome() {
    const collections = await getMyUnsplashCollections();
    const simplifiedCollections = collections.map(({ id, title }) => ({ id, title }));

    return(
        <div className="flex">
            <ArtNav collections={simplifiedCollections}/>
            <Art/>
        </div>
    )
}

function Art() {
    const allArt = readFiles('public/art', 1);

    return(
        <div className='grid grid-cols-1 justify-items-stretch w-full min-h-[calc(100vh-64px)] bg-[#f2f1ed] text-gray-700'>
            <MdxLayout>
                <div className="bg-[#f2f1ed] w-full">
                    <ArtCollection allArt={allArt} />
                </div>
            </MdxLayout>
        </div>
    )
}
