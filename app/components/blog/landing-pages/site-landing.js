import Image from 'next/image';
import { AddGrain } from '../../styles';

// import logo from '@/public/logo.png';
// import hokusaiNashBrownsLogo from '@/public/hokusai-nashbrowns-logo.png';
import hippyHokusaiNashBrownsLogo from '@/public/hippy-hokusai-logo.png';

export function SiteLanding() {
    return(
            <div className="w-full h-[calc(100vh-64px)] overflow-hidden">
                <div className="flex flex-col justify-center items-center h-full w-full">
                    <Image
                        src={hippyHokusaiNashBrownsLogo}
                        alt='NashBrowns Logo'
                        width={500}
                        height={500}
                        className='animate-spin-smooth'
                    />
                </div>
            </div>
    )
}
