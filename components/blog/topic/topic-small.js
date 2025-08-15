import Image from 'next/image';
import Link from 'next/link';

export function TopicSmall({title, subheading, picture, link}){
    return(
        <Link href={link}>
            <div className='flex flex-col bg-base-100 rounded-lg'>
                <h1 className='font-neue text-6xl font-bold tracking-wide place-self-center m-0'>{title}</h1>
                <h3 className='font-mori text-md font-bold tracking-wide'>{subheading}</h3>
                <Image
                    src={picture}
                    width={500}
                    height={500}
                    alt="Picture of the author"
                />
            </div>
        </Link>
    )
}
