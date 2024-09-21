import Image from 'next/image';

export function HeaderSection({name, featuredImage}) {
    return(
        <div className="bg-neutral-800 w-full h-fit">
            <div className='flex items-center justify-center'>
                <Image
                    src={featuredImage}
                    alt={"Artical Featured Image"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: 'auto', height: 'calc(100vh - 2.75rem - 2.5rem - .75rem - .75rem - .75rem)' }} // navbar, lineheight, paddding, padding, padding?
                />
            </div>
            <div className='p-3 text-4xl'>
                <h1 className='uppercase'>{name}</h1>
            </div>
        </div>
    )
}
