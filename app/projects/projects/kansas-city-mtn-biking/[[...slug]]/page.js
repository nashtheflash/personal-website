import { KCMtnBikingMain } from '@/app/components/blog';
import { generateMetadata as gmd } from '@/utils';

import { data } from '@/app/projects/projects/kansas-city-mtn-biking/data';

export function generateStaticParams() {
    return data
}

export async function generateMetadata({ params }) {
    let metadata;

    const slug = (await params).slug
    const areaInfo = getAreaInfo(slug, data);

    if(!slug || !areaInfo) {
        metadata = gmd({
            title:`Kansas City Mountain Biking`,
            description:`Digital Guidebook for Mountain Biking in Kansas City`,
            keywords: ['Kansas City', 'Mountain Biking', 'Guide', 'Nash Bostwick']
        });
    } else {
        metadata = gmd({
            title:`${areaInfo.name} Mountain Biking`,
            description:`Digital Guidebook for Mountain Biking at ${areaInfo.name}`,
            keywords: ['Kansas City', 'Mountain Biking', `${areaInfo.name}`, 'Guide', 'Nash Bostwick']
        });
    }

  return {
    ...metadata
  }
}


export default async function KansasCityMtnBiking({ params }) {
    const { slug }  = await params
    const areaInfo = slug ? getAreaInfo(slug[0], data).name : '';
    
    return(
        <KCMtnBikingMain urlParam={areaInfo}/>
    )
}


function getAreaInfo(areaParam, data) {
    const found = data.find((element) => element.urlParam && element.urlParam == areaParam);
    return found;
}
