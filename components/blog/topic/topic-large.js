
import Image from 'next/image';
import Link from 'next/link';

export function TopicLarge({title, subheading, picture, link}){
    return(
            <div className='flex bg-base-100 rounded-lg w-screen'>
                <h1 className='font-neue text-6xl font-bold tracking-wide place-self-start m-0'>{title}</h1>
            </div>
    )
}
