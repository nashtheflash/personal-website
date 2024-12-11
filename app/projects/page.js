import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faReact,
    faShopify,
} from '@fortawesome/free-brands-svg-icons';
// import nextjs from '/favicon.ico';
import nextjs from "@/public/favicon.ico";
import logo from "@/public/logo.png";

export default function ProjectsHome() {

    return(
        <div className="min-h-[calc(100vh-64px)] bg-[#f2f1ed] w-full">
            <div className="relative flex flex-col justify-center items-center h-full w-full">
                <Project/>
            </div>
        </div>
    )
}

const React = () => <FontAwesomeIcon icon={faReact} className='h-7 w-7'/>;
const Shopify = () => <FontAwesomeIcon icon={faShopify} className='h-7 w-7'/>;
const Nextjs = () => <Image src={nextjs} alt={'Nextjs Icon'} width={'28'} height={'28'}/>


function Project() {
    return(
        <div className="bg-black w-11/12 h-fit">
            <div className="flex justify-between items-center">
                <div className="prose grow-0 w-1/2">
                    <h1 className="text-5xl">WiredWoodsman</h1>
                    <a className="text-xs" href="/">See Blog Post</a>
                    <p>My personal bolg that I use to publish whatever I like! Everythiny that you see on the blog was written or created by me. That includes all of the writing, art, even the website was written by me using some of my favrit techmologies!</p>
                </div>
                <div className='flex justify-center items-center w-1/2'>
                    <Image
                        src={logo}
                        alt={'Logo'}
                        width={400}
                        height={400}
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl">Tech Stack</h1>
                <div className="flex gap-2">
                    <React/>
                    <Shopify/>
                    <Nextjs/>
                </div>
            </div>
        </div>
    )
}

