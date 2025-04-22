import Image from 'next/image';

export function SiteLanding() {
    return(
        <div className='flex fle-col justify-center items-center h-full w-full min-h-[calc(100vh-64px)] p-2'>
            <Image
                src={"/nashbrowns-logo.png"}
                alt='NashBrowns Logo'
                width={500}
                height={500}
                className='animate-spin-smooth'
            />
        </div>
    )
}
