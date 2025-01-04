import { generateMetadata } from '@/utils';
import { SiteLanding } from "./components/blog";

export const metadata = generateMetadata({
    title:"NashBrowns",
    description:"Nashbrowns is a personal website and blog. I blog about traveling, personal projects, cooking, art and fitness.",
    keywords: ['Projects', 'Art', 'Outdoor', 'Travel', 'Blog', 'Alaska', 'Nash Bostwick']
});

export default function Home() {
    return (
        <div className='text-white'>
            <SiteLanding/>
        </div>
    )
}

