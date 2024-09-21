import { ProjectNav, Area, MtnBikeGettingStarted } from '@/app/components/blog';
import { generateMetadata } from '@/utils';

//Data is stored localy
import { data } from './data';

export const metadata = generateMetadata({
    title:"Kansas City Mountain Biking",
    description:"Digital Guidebook for Mountain Biking In Kansas City",
    keywords: ['Kansas City', 'Mountain Biking', 'Guide', 'Nash Bostwick']
});

export default function KansasCityMtmBiking() {
    const areaData = data.map(area => area.name).indexOf('Cedar Niles');

    return(
        <div className="flex w-full min-h-screen">
            <ProjectNav data={data}/>
            {
                areaData >= 0 ? <Area data={data[areaData]}/> : <MtnBikeGettingStarted/>
            }
        </div>
    )
}
