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
            <div className="card bg-base-100 w-96 h-full max-h-[600px] shadow-sm">
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
                    <h2 className="card-title mt-2 mb-1">{title}</h2>
                    <p>{description}</p>
                    <div className="card-actions justify-end">
                    <Link href={article}>
                        <button className="btn btn-primary">View Article</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
