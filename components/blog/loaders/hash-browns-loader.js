import Image from 'next/image';
import { chewy } from "@/lib/fonts";

export function HashBrownsLoader({loadingText, color}) {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center w-full p-2 overflow-hidden bg-transparent'>
                <Image
                    src={"/loading.svg"}
                    alt='NashBrowns Logo'
                    width={150}
                    height={150}
                    className={`-mb-9 ${color == 'white' ? 'invert' : ''}`}
                />
                <Image
                    src={"/nashbrowns-logo.png"}
                    alt='NashBrowns Logo'
                    width={150}
                    height={150}
                    className='animate-spin-smooth mt-0'
                />
            </div>
            <p className={`${chewy.className} ${color == 'white' ? 'text-white' : 'text-black'}`}>{loadingText}</p>
        </div>
    )
}
