'use client'
import { useRouter } from 'next/navigation'

export function ArtNav({ collections }) {
    const router = useRouter()

    return(
        <ul className="menu bg-base-200 rounded-box w-56">
            { 
                    collections && collections.map((collection) => {
                        return(
                            <li>
                                <a onClick={() => router.push(`/art?collection=${collection.id}`)}>
                                    {collection.title}
                                </a>
                            </li>
                        )
                })
            }
        </ul>
    )
};

