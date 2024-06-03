import Link from 'next/link';
import { getFooterItem } from '@/lib/db';
import { PhoneIcon, GlobeAltIcon, MapPinIcon } from '@heroicons/react/24/solid';

export async function Footer({ phone, website, address, googleMapsLink, galleryUrl, related}) {
    return (
        <>
            <AllPhotos galleryUrl={galleryUrl}/>
            { (phone != undefined || website != undefined || address != undefined || googleMapsLink != undefined) &&
            <Contact 
                phone={phone}
                website={website}
                address={address}
                googleMapsLink={googleMapsLink}
            />
            }
            { related &&
                <>
                    <h2>Related Articals</h2>
                    <Related related={related}/>
                </>
            }
        </>
    )
}

//NEED TO ADD AFILIATE BOOKING LINKS
//OPTIONS:
//HostilWorld
function Contact({ phone, website, address, googleMapsLink }) {
    return(
        <>
            <h2>Contact</h2>
            <ul className="space-y-1 text-gray-500 list-inside dark:text-gray-400">
                <li className="flex items-center gap-2">
                    <PhoneIcon className='w-4 h-4'/>
                    {phone ? phone : 'Phone Number Unavailable'}
                </li>
                <li className="flex items-center gap-2">
                    <GlobeAltIcon className='w-4 h-4'/>
                    {website ? website : 'Website Unavailable'}
                </li>
                <li className="flex items-center gap-2">
                        <MapPinIcon className='w-4 h-4'/>
                    <a href={googleMapsLink}>
                        {address ? address : 'Address Unavailable'}
                    </a>
                </li>
            </ul>
        </>
    )
}

function AllPhotos({galleryUrl}) {
    return(
        <>
            <h2>All Photos</h2>
            <p>{"I took alot more photos! I can't include every photo in the artical, but they can be seen here: "}<Link href={galleryUrl}>All Photos</Link></p> 
        </>
    )
}

async function Related({related}) {
    
    const [ relatedOne, relatedTwo, relatedThree ] = await Promise.all([
        getFooterItem(related[0]),
        getFooterItem(related[1]),
        getFooterItem(related[2]),
    ]);

    return (
        <div className='flex justify-center items-stretch gap-2 mb-10'>
            <Card data={relatedOne}/>
            <Card data={relatedTwo}/>
            <Card data={relatedThree}/>
        </div>
    )
}

function Card({data}) {
    const {title, description, thumbnail, url} = data;

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl ronded-lg overflow-hidden">
            <Link href={url} className='no-underline'>
                { thumbnail ? <figure className='m-0'><img src={thumbnail} alt="Shoes" /></figure> : <figure className='m-0'><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> }
                <div className="card-body">
                    { title ? <h2 className="card-title mt-2">{title}</h2> : <h2 className="card-title mt-2">Shoes!</h2> }
                    { description ? <p>{description}</p> : <p>If a dog chews shoes whose shoes does he choose?</p>}            
                </div>
            </Link>
        </div>
    )
}
