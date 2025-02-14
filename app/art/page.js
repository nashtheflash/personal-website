import { readFiles } from "@/lib/next-path"
import { MdxLayout, ArtNav, Art, ArtCollection } from "../components/blog"
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

