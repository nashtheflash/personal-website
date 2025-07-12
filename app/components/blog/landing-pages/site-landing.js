import Image from 'next/image';

// import logo from '@/public/logo.png';
import hokusaiNashBrownsLogo from '@/public/hokusai-nashbrowns-logo.png';

export function SiteLanding() {
    return(
        <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-64px)] p-2 overflow-hidden bg-[url('/textures/noise-yellow-1.png')] bg-repeat bg-[length:50px]">
            <Image
                src={hokusaiNashBrownsLogo}
                alt='NashBrowns Logo'
                width={500}
                height={500}
                className='animate-spin-smooth'
            />
        </div>
    )
}
