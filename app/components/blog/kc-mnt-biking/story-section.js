import { MdxLayoutParentWidth } from '@/app/components/blog';

//MDX articals
import CedarNiles from '../../../projects/projects/kansas-city-mtn-biking/articals/cedar-niles.mdx'
import KillCreek from '../../../projects/projects/kansas-city-mtn-biking/articals/kill-creek.mdx'
import NallPark from '../../../projects/projects/kansas-city-mtn-biking/articals/nall-park.mdx'
import Rozarks from '../../../projects/projects/kansas-city-mtn-biking/articals/rozark.mdx'
import ShawneeMissionPark from '../../../projects/projects/kansas-city-mtn-biking/articals/shawnee-mission-park.mdx'
import HodgePark from '../../../projects/projects/kansas-city-mtn-biking/articals/hodge-park.mdx'
import LexingtonLake from '../../../projects/projects/kansas-city-mtn-biking/articals/lexington-lake.mdx'
import SwopePark from '../../../projects/projects/kansas-city-mtn-biking/articals/swope-park.mdx'
import BigBullCreek from '../../../projects/projects/kansas-city-mtn-biking/articals/big-bull-creek.mdx'
import MartinCityDownhill from '../../../projects/projects/kansas-city-mtn-biking/articals/martin-city-downhill.mdx'
import KesslerPark from '../../../projects/projects/kansas-city-mtn-biking/articals/kessler-park.mdx'
import HiddenValleyPark from '../../../projects/projects/kansas-city-mtn-biking/articals/hidden-valley-park.mdx'
import Stockdale from '../../../projects/projects/kansas-city-mtn-biking/articals/stockdale.mdx'
import MopacSingletrack from '../../../projects/projects/kansas-city-mtn-biking/articals/mopac-singletrack.mdx'

export function StorySection({name}) {

    const artical = (name) => {
      switch(name) {

        case "Cedar Niles":   return <CedarNiles/>;
        case "Kill Creek":   return <KillCreek/>;
        case "Nall Park":   return <NallPark/>;
        case "Rozarks":   return <Rozarks/>;
        case "Shawnee Mission Park":   return <ShawneeMissionPark/>;
        case "Hodge Park":   return <HodgePark/>;
        case "Lexington Lake":   return <LexingtonLake/>;
        case "Swope Park":   return <SwopePark/>;
        case "Big Bull Creek":   return <BigBullCreek/>;
        case "Martin City Downhill":   return <MartinCityDownhill/>;
        case "Kessler Park":   return <KesslerPark/>;
        case "Hidden Valley Park":   return <HiddenValleyPark/>;
        case "Stockdale":   return <Stockdale/>;
        case "MoPac Single Track":   return <MopacSingletrack/>;
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
