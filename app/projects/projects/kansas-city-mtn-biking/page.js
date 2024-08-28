import Image from 'next/image';
import Map from '@/app/components/general/map-container';

import {MapIcon, InformationCircleIcon} from '@heroicons/react/24/outline'

import featureImage from "@/public/mtn-bike-kc/cedar-niles/cedar-niles-car.jpg";
import ListDot from "@/public/mtn-bike-kc/arrow-list-bullet.png";
import DistanceIcon from "@/public/mtn-bike-kc/distance.png";
import DaysIcon from "@/public/mtn-bike-kc/days.png";
import PavementIcon from "@/public/mtn-bike-kc/pavement.png";
import SingleTrackIcon from "@/public/mtn-bike-kc/singletrack.png";
import RideabilityIcon from "@/public/mtn-bike-kc/rideability.png";
import HighPointIcon from "@/public/mtn-bike-kc/highpoint.png";
import DifficultyIcon from "@/public/mtn-bike-kc/difficulty.png";
import AscentIcon from "@/public/mtn-bike-kc/ascent.png";


export default function KansasCityMtmBiking() {
    return(
        <div className="flex w-full min-h-screen">
            <ProjectNav/>
            <Area/>
        </div>
    )
}


export function ProjectNav() {
    return(
        <ul className="menu bg-base-200 rounded-box w-56 m-2">
            <Badge text='#1'><li className="w-full"><a>Cedar Niles</a></li></Badge>
            <Badge text='#2'><li className="w-full"><a>Kill Creek</a></li></Badge>
            <Badge text='#3'><li className="w-full"><a>Blue River Parkway</a></li></Badge>
            <Badge text='#4'><li className="w-full"><a>Nall Park</a></li></Badge>
            <Badge text='#4'><li className="w-full"><a>Landahl Park</a></li></Badge>
        </ul>
    )
}

export function Badge({children, text}) {
    return(
        <div className="indicator w-full">
            <span className="indicator-item indicator-start badge badge-primary">{text}</span>
            {children}
        </div>
    )
}


export function Area() {
    return(
        <div className="w-full h-full min-h-screen bg-[#f2f1ed]">
            <HeaderSection/>
            <StatsSection/>
            <StorySection/>
            <PhotoGallery/>
            <MapSection/>
            <FAQSection/>
        </div>
    )
}

export function HeaderSection() {
    return(
        <div className="bg-neutral-800 w-full h-fit">
            <Image
                src={featureImage}
                alt={"title"}
            />
            <div className='p-3 text-4xl'>
                <h1>CEDAR NILES</h1>
            </div>
        </div>
    )
}

export function StatsSection() {
    return(
        <div className="bg-[#bdd2c9] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] text-black w-full h-56">
            <div className='grid grid-cols-4 h-full items-center justify-items-center'>
                <Stat title='Distance Total' Icon={DistanceIcon} stat='50 Mi' statAlt='(10 KM.)'/>
                <Stat title='Number of Trails' Icon={SingleTrackIcon} stat='5'/>
                <Stat title='Jump Lines' Icon={DifficultyIcon} stat='1'/>
                <Stat title='Difficulty' Icon={DifficultyIcon} stat='5'/>
                <Stat title='Rank' Icon={AscentIcon} stat='3 in KC'/>
                <Stat title='Traffic' Icon={RideabilityIcon} stat='High'/>
                <Stat title='Somthing else' Icon={DifficultyIcon} stat='5'/>
                <Stat title='Current Status' Icon={PavementIcon} stat='Good to go'/>
            </div>
        </div>
    )
}

export function Stat({Icon, title, stat, statAlt}) {
    return(
        <>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-sm text-gray-600'>{title}</h2>
                <div className="flex gap-2 justify-center items-center">
                    <Image
                        src={Icon}
                        alt={"Stat Icon"}
                    />
                    <div className='text-black'>
                        <p>{stat}</p>
                        {statAlt && <span>{statAlt}</span>}
                    </div>
                </div>
            </div>
        </>
    )
}

export function StorySection() {
    return(
        <div className="w-full h-full">
            <h1>HI this is a MDX story</h1>
        </div>
    )
}

export function MapSection() {
    const gpxTracks = [
        {name: 'Scape Goat', url: '/mtn-bike-kc/cedar-niles/gpx-files/scape-goat.gpx'},
        {name: 'Billy Goat', url: '/mtn-bike-kc/cedar-niles/gpx-files/billy-goat.gpx'},
        {name: 'Columbine Loop', url: '/mtn-bike-kc/cedar-niles/gpx-files/columbine-loop.gpx'},
        {name: 'Columbine Connector', url: '/mtn-bike-kc/cedar-niles/gpx-files/columbine-connector.gpx'},
        {name: 'Technical Loop', url: '/mtn-bike-kc/cedar-niles/gpx-files/technical-loop.gpx'},
        {name: 'Columbine Bypass', url: '/mtn-bike-kc/cedar-niles/gpx-files/columbine-bypass.gpx'},
    ];

    return(
        <Map mapHeight='400' tracks={gpxTracks}/>
    )
}

export function FAQSection() {
    return(
        <div className='min-h-80'>
            <div role="tablist" className="tabs tabs-lifted p-2">
                <input 
                    type="radio" 
                    name="my_tabs_2" 
                    role="tab" 
                    className="tab [--tab-bg:#d0cfcd] [--tab-border-color:#d0cfcd] text-gray-500" 
                    aria-label="Directions" 
                    defaultChecked 
                />
                <div role="tabpanel" className="tab-content bg-[#d0cfcd] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] border-[#d0cfcd] rounded-box p-6">
                    <div className='grid grid-cols-2'>
                        <FAQItem title='List item 1' txt='this is more information about the title'/>
                        <FAQItem title='List item 2' txt='this is more information about the title'/>
                        <FAQItem title='List item 3' txt='this is more information about the title'/>
                    </div>
                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab [--tab-bg:#d0cfcd] [--tab-border-color:#d0cfcd] text-gray-500" 
                    aria-label="Highlights"
                />
                <div role="tabpanel" className="tab-content bg-[#d0cfcd] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] border-[#d0cfcd] rounded-box p-6">
                    <div className='grid grid-cols-2'>
                        <FAQSummary txt='There is absolutly no food in Olathe and it is awful. Do not go to Olathe for any reason ever!! This is just extra text to get to get the line to wrap' />
                        <FAQItem title='List item 1' txt='this is more information about the title'/>
                        <FAQItem title='List item 2' txt='this is more information about the title'/>
                        <FAQItem title='List item 3' txt='this is more information about the title'/>
                    </div>
                </div>

                <input 
                    type="radio" 
                    name="my_tabs_2" 
                    role="tab" 
                    className="tab [--tab-bg:#d0cfcd] [--tab-border-color:#d0cfcd] text-gray-500" 
                    aria-label="Food/Drink" 
                />
                <div role="tabpanel" className="tab-content bg-[#d0cfcd] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] border-[#d0cfcd] rounded-box p-6">
                    <FAQItem title='List item 3' txt='this is more information about the title'/>
                </div>
            </div>
        </div>
    )
}

export function FAQItem({title, txt}) {
    return(
        <div className='flex justify-start items-center gap-2 py-1 text-black'>
            <Image
                src={ListDot}
                alt={"List Icon"}
                className='h-4 w-4'
            />
            <strong>{title}</strong>{txt}
        </div>
    )
}

export function FAQSummary({txt}) {
    return(
        <div className='p-2 mx-4 mt-1 mb-4 col-span-2 rounded bg-gray-400 bg-opacity-30'>
            <p className='text-black'>{txt}</p>
        </div>
    )
}

export function PhotoGallery() {
    return(
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-black'>Photo Gallery</h1>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Footer() {
    return(
        <div className="bg-emerald-800 w-full h-56">
            <h1>I AM THE Footer</h1>
        </div>
    )
}
