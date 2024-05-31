import { TopicLanding, TopicSmall } from '@/app/components/blog'
import { generateMetadata } from '@/utils';

export const metadata = generateMetadata({
    title:"Alaska",
    description:"Alaska home page for the Wired Woodsman blog",
    keywords: ['Travel', 'Blog', 'Alaska', 'Nash Bostwick']
});

import artOne from "@/public/art/week-one/activity-one.JPG";
const topics = [
    <TopicSmall title='Artical 1' subheading='this is a sub' picture={artOne} link='/blog/travel/alaska'/>,
    <TopicSmall title='Artical 2' subheading='this is a sub' picture={artOne} link='/blog/travel/costa-rica'/>
]

export default function Travel() {
    return(
        <TopicLanding
            topics={topics}
        />
    )
}
