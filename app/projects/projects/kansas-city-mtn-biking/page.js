import { KCMtnBikingMain } from '@/app/components/blog';
import { generateMetadata } from '@/utils';

export const metadata = generateMetadata({
    title:"Kansas City Mountain Biking",
    description:"Digital Guidebook for Mountain Biking In Kansas City",
    keywords: ['Kansas City', 'Mountain Biking', 'Guide', 'Nash Bostwick']
});

export default function KansasCityMtnBiking() {

    return(
        <KCMtnBikingMain/>
    )
}
