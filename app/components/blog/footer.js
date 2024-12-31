import Image from 'next/image';

export async function Footer({ phone, website, address, googleMapsLink, galleryUrl, related}) {
    return (
        <div className="bg-[#bdd2c9] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] py-5 text-black w-full h-fit justify-self-center">
            <Logo/>
        </div>
    )
}

function Logo() {
    return(
        <div className='flex flex-col justify-center items-center h-fit p-2'>
            <Image
                src="/logo.png"
                width={250}
                height={250}
                className='animate-spin-smooth'
            />
        </div>
    )
}
