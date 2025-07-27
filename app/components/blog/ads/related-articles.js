'use server'
import Image from 'next/image';
import Link from 'next/link';
import { getSingleBlogPostMetadata } from "@/lib/next-path"

export async function RelatedArticles({articleOne, articleTwo, articleThree}) {

    return(
        <>
            <div className='w-full'>
                <h2 className='text-center font-mono'>Related Articles</h2>
            </div>
            <div className="flex flex-col gap-3 md:flex-row justify-between items-center w-full">
                <RelatedCard article={articleOne}/>
                <RelatedCard article={articleTwo}/>
                <RelatedCard article={articleThree}/>
            </div>
        </>
    )
}

async function RelatedCard({article}) {
    const {title, thumbnail, description} = await getSingleBlogPostMetadata(article);

    return(
            <div className="card bg-[#bdd2c9] bg-[url('/topo-bg-3-black.png')] w-96 h-full max-h-[600px] shadow-sm">
                <figure className='relative w-full h-52 my-0'>
                    <Image
                        alt={`${title} Feature Image`}
                        src={thumbnail}
                        fill
                        sizes="(min-width: 808px) 50vw, 100vw"
                        style={{
                            objectFit: 'cover', // cover, contain, none
                        }}
                    />
                </figure>
                <div className="card-body p-3">
                    <h2 className="card-title mt-2 mb-1 text-slate-700">{title}</h2>
                    <p className='text-slate-600 font-light'>{description.slice(0, 247).trim() + (description.length > 250 ? '...' : '')}</p>

                    <div className="card-actions justify-end">
                    <Link href={article}>
                        <button className="btn btn-info">View Article</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
