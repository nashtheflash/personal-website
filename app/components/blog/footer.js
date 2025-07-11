import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faStrava,
    faYoutube,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';

import garmin from "@/public/garmin-logo-simple.png";
// import footer from "@/public/texture/footer-texture.png";
import Link from 'next/link';
import { didot } from "@/lib/fonts";


export function Footer() {
    return (
        <footer className={`footer footer-horizontal footer-center bg-[#bdd2c9] bg-[url('/topo-bg-3-black.png')] text-indigo-900 rounded ${didot.className}`}>
            <div className="w-full h-full p-10 bg-[url('/textures/default-noise.png')] bg-repeat bg-[length:50px]">
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
                                className='h-12 w-12'
                                draggable={false}
                            />
                        </a>
                    </div>
                </nav>
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All rights reserved by Nash Browns</p>
                </aside>
            </div>
        </footer>
    )
}
