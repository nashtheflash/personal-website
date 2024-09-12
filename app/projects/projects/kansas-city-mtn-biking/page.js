import Image from 'next/image';
import Map from '@/app/components/general/map-container';
import { BlackTieTitle } from '@/app/components/blog/section-headers/black-tie';
import { BlogMapWrapper } from '@/app/components/blog';
import { FAQSection } from '@/app/components/blog/kc-mnt-biking/faq-section';
import { PhotoCarousel } from '@/app/components/blog/images/photo-carousel';

import {MapIcon, InformationCircleIcon} from '@heroicons/react/24/outline'

import ListDot from "@/public/mtn-bike-kc/arrow-list-bullet.png";
import DistanceIcon from "@/public/mtn-bike-kc/distance.png";
import DaysIcon from "@/public/mtn-bike-kc/days.png";
import PavementIcon from "@/public/mtn-bike-kc/pavement.png";
import SingleTrackIcon from "@/public/mtn-bike-kc/singletrack.png";
import RideabilityIcon from "@/public/mtn-bike-kc/rideability.png";
import HighPointIcon from "@/public/mtn-bike-kc/highpoint.png";
import DifficultyIcon from "@/public/mtn-bike-kc/difficulty.png";
import AscentIcon from "@/public/mtn-bike-kc/ascent.png";

import featureImage from "@/public/mtn-bike-kc/cedar-niles/cedar-niles-car.JPEG";


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
            <div className=''>
                <Image
                    src={featureImage}
                    alt={"title"}
                    className={'h-[calc(100vh-6rem-36px)]'}
                />
            </div>
            <div className='p-3 text-4xl'>
                <h1>CEDAR NILES</h1>
            </div>
        </div>
    )
}

export function StatsSection() {
    return(
        <div className="bg-[#bdd2c9] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] py-5 text-black w-full h-fit">
            <div className='grid grid-cols-2 h-full items-center justify-items-center sm:grid-cols-3 md:grid-cols-4'>
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
        {name: 'Scape Goat', difficulty: 'easy', url: '/mtn-bike-kc/cedar-niles/gpx-files/scape-goat.gpx'},
        {name: 'Billy Goat', difficulty: 'easy', url: '/mtn-bike-kc/cedar-niles/gpx-files/billy-goat.gpx'},
        {name: 'Columbine Loop', difficulty: 'easy', url: '/mtn-bike-kc/cedar-niles/gpx-files/columbine-loop.gpx'},
        {name: 'Columbine Connector', difficulty: 'easy', url: '/mtn-bike-kc/cedar-niles/gpx-files/columbine-connector.gpx'},
        {name: 'Technical Loop', difficulty: 'medium', url: '/mtn-bike-kc/cedar-niles/gpx-files/technical-loop.gpx'},
        {name: 'Columbine Bypass', difficulty: 'easy', url: '/mtn-bike-kc/cedar-niles/gpx-files/columbine-bypass.gpx'},
    ];

    return(
        <Map mapHeight='400' tracks={gpxTracks}/>
    )
}

export function PhotoGallery() {

    const photos = [
        "/mtn-bike-kc/cedar-niles/cedar-niles-car.JPEG",
        "/mtn-bike-kc/cedar-niles/big-jump.JPEG",
        "/mtn-bike-kc/cedar-niles/small-jump.JPEG",
    ]

    return(
        <div className='flex flex-col justify-center items-center'>
            <BlackTieTitle title='PHOTO GALLERY'/>
            <PhotoCarousel photoUrls={photos}/>
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
