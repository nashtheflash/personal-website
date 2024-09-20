import Image from 'next/image';
import Map from '@/app/components/general/map-container';
import { BlackTieTitle } from '@/app/components/blog/section-headers/black-tie';
import { FAQSection } from '@/app/components/blog/kc-mnt-biking/faq-section';
import { PhotoCarousel } from '@/app/components/blog/images/photo-carousel';
import { MdxLayoutParentWidth } from '@/app/components/blog';
import { generateMetadata } from '@/utils';

//Icons
import DistanceIcon from "@/public/mtn-bike-kc/distance.png";
import PavementIcon from "@/public/mtn-bike-kc/pavement.png";
import SingleTrackIcon from "@/public/mtn-bike-kc/singletrack.png";
import RideabilityIcon from "@/public/mtn-bike-kc/rideability.png";
import DifficultyIcon from "@/public/mtn-bike-kc/difficulty.png";
import DaysIcon from "@/public/mtn-bike-kc/days.png";
import HighPointIcon from "@/public/mtn-bike-kc/highpoint.png";
import AscentIcon from "@/public/mtn-bike-kc/ascent.png";

//MDX articals
import CedarNiles from './articals/cedar-niles.mdx'

//Data is stored localy
import { data } from './data';

export const metadata = generateMetadata({
    title:"Kansas City Mountain Biking",
    description:"Digital Guidebook for Mountain Biking In Kansas City",
    keywords: ['Kansas City', 'Mountain Biking', 'Guide', 'Nash Bostwick']
});

//probably the only things that needs to be in this file
export default function KansasCityMtmBiking() {
    const areaData = data.map(area => area.name).indexOf('Cedar Niles');

    return(
        <div className="flex w-full min-h-screen">
            <ProjectNav data={data}/>
            {
                areaData >= 0 ? <Area data={data[areaData]}/> : <GettingStarted/>
            }
        </div>
    )
}


export function ProjectNav({data}) {
    return(
        <ul className="menu bg-base-200 rounded-box w-56 m-2">
            {
                data && data.map(({name, rank}, index) => (
                    <Badge key={index} text={`#${rank}`}><li className="w-full"><a>{name}</a></li></Badge>
                ))

            }
            <Badge text='#2'><li className="w-full"><a>Kill Creek</a></li></Badge>
            <Badge text='#3'><li className="w-full"><a>Blue River Parkway</a></li></Badge>
            <Badge text='#4'><li className="w-full"><a>Nall Park</a></li></Badge>
            <Badge text='#4'><li className="w-full"><a>Landahl Park</a></li></Badge>
            <Badge text='#5'><li className="w-full"><a>St. Joe</a></li></Badge>
        </ul>
    )
}

//TODO: need to build ot the beginning state of the page
export function GettingStarted() {
    return(
        <div className="w-full h-full min-h-screen bg-[#f2f1ed]">
            <h1>Just getting started</h1>
        </div>
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


export function Area({data}) {
    const { name, rank, featuredImage, stats, gpxTracks, photos, accessInfo, faqHighlights, faqFoodDrink } = data;

    return(
        <div className="w-full h-full min-h-screen bg-[#f2f1ed]">
            <HeaderSection name={name} featuredImage={featuredImage}/>
            <StatsSection stats={stats}/>
            <StorySection name={name}/>
            <PhotoGallery photos={photos}/>
            <MapSection gpxTracks={gpxTracks}/>
            <FAQSection accessInfo={accessInfo} faqHighlights={faqHighlights} faqFoodDrink={faqFoodDrink} />
        </div>
    )
}

export function HeaderSection({name, featuredImage}) {
    return(
        <div className="bg-neutral-800 w-full h-fit">
            <div className='flex items-center justify-center'>
                <Image
                    src={featuredImage}
                    alt={"Artical Featured Image"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: 'auto', height: 'calc(100vh - 2.75rem - 2.5rem - .75rem - .75rem - .75rem)' }} // navbar, lineheight, paddding, padding, padding?
                />
            </div>
            <div className='p-3 text-4xl'>
                <h1 className='uppercase'>{name}</h1>
            </div>
        </div>
    )
}

export function StatsSection({stats}) {
    
    const {
            distanceMiles,
            numberOfTrails,
            flowTrails,
            downHillTrails,
            XCTrails,
            areaDificulty,
            traffic,
            currentStatus,
    } = stats;

    return(
        <div className="bg-[#bdd2c9] bg-[url('/mtn-bike-kc/topo-bg-3-black.png')] py-5 text-black w-full h-fit">
            <div className='grid grid-cols-2 h-full items-center justify-items-center sm:grid-cols-3 md:grid-cols-4'>
                <Stat title='Distance Total' Icon={DistanceIcon} stat={`${distanceMiles} Mi`} statAlt={`(${distanceMiles * 1.609} KM)`}/>
                <Stat title='Number of Trails' Icon={SingleTrackIcon} stat={numberOfTrails}/>
                <Stat title='Flow' Icon={DifficultyIcon} stat={flowTrails}/>
                <Stat title='Down Hill' Icon={DifficultyIcon} stat={downHillTrails}/>
                <Stat title='XC' Icon={DifficultyIcon} stat={XCTrails}/>
                <Stat title='Difficulty' Icon={DifficultyIcon} stat={areaDificulty}/>
                <Stat title='Traffic' Icon={RideabilityIcon} stat={traffic}/>
                <Stat title='Current Status' Icon={PavementIcon} stat={currentStatus}/>
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

export function StorySection({name}) {

    const artical = (name) => {
      switch(name) {

        case "Cedar Niles":   return <CedarNiles />;
        default:      return <h1>No project match</h1>

      }
    }

    return(
        <div className='flex flex-col justify-center items-center py-12 w-[calc(100vw-14rem)]'>
            <MdxLayoutParentWidth>
                <div className='text-gray-600'>
                    {artical(name)}
                </div>
            </MdxLayoutParentWidth>
        </div>
    )
}

export function MapSection({gpxTracks}) {
    return(
        <Map mapHeight='400' tracks={gpxTracks}/>
    )
}

export function PhotoGallery({photos}) {
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
