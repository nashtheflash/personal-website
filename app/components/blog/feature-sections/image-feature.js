import Image from 'next/image';

export function ImageFeature({title, image}) {
    return(
        <div className="bg-neutral-800 w-full h-[calc(100%-63px)]">
            <div className='flex items-center justify-center'>
                <Image
                    src={image}
                    alt={"Artical Featured Image"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100vw', height: 'calc(100vh - 63px - 2.5rem - .75rem - .75rem - .75rem)', margin: '0' }} // navbar, lineheight, paddding, padding, padding?
                />
            </div>
            <div className='bg-neutral-800 w-full'>
                <div className='prose p-3 text-xl '>
                    <h1 className='uppercase'>{title}</h1>
                </div>
            </div>
        </div>
    )
}
