import { MdxLayoutParentWidth } from '@/app/components/blog';

//MDX articals
import CedarNiles from '../../../projects/projects/kansas-city-mtn-biking/articals/cedar-niles.mdx'
import KillCreek from '../../../projects/projects/kansas-city-mtn-biking/articals/kill-creek.mdx'

export function StorySection({name}) {

    const artical = (name) => {
      switch(name) {

        case "Cedar Niles":   return <CedarNiles/>;
        case "Kill Creek":   return <KillCreek/>;
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
