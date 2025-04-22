import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faStrava,
    faYoutube,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';

import garmin from "@/public/garmin-connect.png";
import Link from 'next/link';


export function Footer({ phone, website, address, googleMapsLink, galleryUrl, related}) {
    return (
        <footer className="footer footer-horizontal footer-center bg-[#bdd2c9] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] text-black rounded p-10">
            <nav className="grid grid-flow-col gap-4">
                <Link href={'/blog/articals/nash-browns'} className="link link-hover">About</Link>
                <Link href={'/partners'} className="link link-hover">Contact</Link>
                <Link href={'/partners'} className="link link-hover">Partners</Link>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a target='_blank' href={"https://www.instagram.com/nashtheflash/"}>
                        <FontAwesomeIcon icon={faInstagram} className='h-12 w-12'/>
                    </a>
                    <a target='_blank' href={"https://www.youtube.com/@nash_brownss"}>
                        <FontAwesomeIcon icon={faYoutube} className='h-12 w-12'/>
                    </a>
                    <a target='_blank' href={"https://www.strava.com/athletes/111233131"}>
                        <FontAwesomeIcon icon={faStrava} className='h-12 w-12'/>
                    </a>
                    <a target='_blank' href={"https://connect.garmin.com/modern/profile/c1d46b77-b206-4536-a599-da56c5bac468"}>
                        <Image
                            src={garmin}
                            alt='Garmin Logo'
                            width={64}
                            height={64}
                            className='h-12 w-12 grayscale'
                            draggable={false}
                        />
                    </a>
                </div>
            </nav>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Nash Browns</p>
            </aside>
        </footer>
    )
}






// export async function Footer({ phone, website, address, googleMapsLink, galleryUrl, related}) {
//     return (
//         <div className="bg-[#bdd2c9] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] py-5 text-black w-full h-fit justify-self-center">
//             <Logo/>
//         </div>
//     )
// }

function Logo() {
    return(
        <div className='flex flex-col justify-center items-center h-16 p-2 overflow-hidden'>
            <Image
                src={"/nashbrowns-logo.png"}
                alt='NashBrowns Logo'
                width={64}
                height={64}
                className='animate-spin-smooth select-none unselectable'
                draggable={false}
            />
        </div>
    )
}
