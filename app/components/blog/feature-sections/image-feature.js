import Image from 'next/image';

export function ImageFeature({title, image, alt}) {
    return(
        <div className="flex flex-col bg-neutral-800 w-full h-[calc(100vh-63px)]">
            <div className='relative flex items-center justify-center w-full h-full'>
                <Image
                    src={image}
                    alt={alt ? alt : "Artical Featured Image"}
                    style={{ objectFit: 'cover', margin: '0' }} // navbar, lineheight, paddding, padding, padding?
                    fill={true}
                />
            </div>
            <div className='bg-neutral-800 w-full h-fit'>
                <div className='prose p-3 text-xs sm:text-xl '>
                    <h1 className='uppercase'>{title}</h1>
                </div>
            </div>
        </div>
    )
}
