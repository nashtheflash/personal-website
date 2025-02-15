'use client'

import Image from "next/image";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState} from "react";
import { getPhotosInCollection } from "@/app/server-actions/unsplash";

export function ArtCollection({allArt}) {
    const [photos, setPhotos] = useState(); 

    const searchParams = useSearchParams()
    const collectionId = searchParams.get('collection')

    useEffect(() => {
        async function fetchPhotos() {
            const data = await getPhotosInCollection(collectionId || 'NNFr348ZLYA'); // featured collection id// featured collection id
            setPhotos(data);
        }
        fetchPhotos();
    }, [collectionId]) 


    return(
        <div className="not-prose grid grid-cols-1 gap-2 justify-items-center items-center w-full">
            {
                photos && photos.map((photo, i) => {
                    return (
                        <div key={i} className={`relative h-fit w-fit`}>
                            <a href={`/art/view-piece/${photo.id}`}>
                                <ArtCard 
                                    image={photo.urls.raw}
                                    name='tbd'
                                />
                            </a>
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
            src={image}
            alt={`${name}`}
            width={640}
            height={445}
        />
    )
}

