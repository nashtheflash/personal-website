import { readFiles } from "@/lib/next-path"
import Image from "next/image";
import { MdxLayout } from "../components/blog"

export default function ArtHome() {

    return(
        <div className='grid grid-cols-1 justify-items-stretch w-full min-h-[calc(100vh-64px)] bg-[#f2f1ed] text-gray-700'>
            <MdxLayout>
                <div className="bg-[#f2f1ed] w-full">
                    <ArtList/>
                </div>
            </MdxLayout>
        </div>
    )
}

async function ArtList() {
    const allArt = readFiles('public/art', 1);

    return(
        <div className="not-prose grid grid-cols-1 gap-2 justify-items-center items-center w-full">
            {
                allArt.map((work, i) => {
                    return (
                        <div key={i} className={`relative h-fit w-fit`}>
                                <ArtCard 
                                    image={work.fileName}
                                    name={work.name}
                                />
                        </div>
                    )
                })
            }
        </div>
    )
}

function ArtCard({image, name}) {
    return(
        <Image
            src={`/art/${image}`}
            alt={`${name}`}
            width={640}
            height={445}
        />
    )
}
