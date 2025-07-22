import { generateMetadata } from '@/utils';
import { SiteLanding } from "./components/blog";

export const metadata = generateMetadata({
    title:"Nash Browns",
    description:"Just Jokes:)",
    keywords: ['Projects', 'Art', 'Outdoor', 'Travel', 'Blog', 'Alaska', 'Nash Bostwick']
});

export default function Home() {
    return (
        <SiteLanding/>
    )
}

