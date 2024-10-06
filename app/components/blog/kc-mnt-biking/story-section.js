import { MdxLayoutParentWidth } from '@/app/components/blog';

//MDX articals
import CedarNiles from '../../../projects/projects/kansas-city-mtn-biking/articals/cedar-niles.mdx'
import KillCreek from '../../../projects/projects/kansas-city-mtn-biking/articals/kill-creek.mdx'
import NallPark from '../../../projects/projects/kansas-city-mtn-biking/articals/nall-park.mdx'
import Rozarks from '../../../projects/projects/kansas-city-mtn-biking/articals/rozark.mdx'
import ShawneeMissionPark from '../../../projects/projects/kansas-city-mtn-biking/articals/shawnee-mission-park.mdx'
import HodgePark from '../../../projects/projects/kansas-city-mtn-biking/articals/hodge-park.mdx'

export function StorySection({name}) {

    const artical = (name) => {
      switch(name) {

        case "Cedar Niles":   return <CedarNiles/>;
        case "Kill Creek":   return <KillCreek/>;
        case "Nall Park":   return <NallPark/>;
        case "Rozarks":   return <Rozarks/>;
        case "Shawnee Mission Park":   return <ShawneeMissionPark/>;
        case "Hodge Park":   return <HodgePark/>;
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
