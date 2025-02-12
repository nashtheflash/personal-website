import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faBitcoin,
} from '@fortawesome/free-brands-svg-icons';

export default async function Page({ params }) {
    const slug = (await params).slug

    return (
        <>
            <div className="flex flex-wrap md items-center h-screen max-h-[calc(100vh-64px)]">
                <div className="bg-white w-full md:w-1/2 h-screen max-h-[calc(100vh-64px)] flex flex-col">
                    <div className="mx-32">
                        <Title title={slug}/>
                        <Labels/>
                        <Description/>
                        <ReadMore/>
                    </div>
                    <div className='flex justify-center gap-24 mt-auto w-full'>
                        <Download/>
                        <Purchase/>
                    </div>
                </div>
                <Art/>
            </div>
        </>
    )
}

export function Title({title}) {
    return(
        <h1 className="text-6xl font-bold text-black mt-16">{title}</h1>
    )
}
export function Labels({labels}) {
    //medium paint/photo/ect...
    return(
        <div className="flex mt-16 font-light text-gray-500">
            <div className="pr-4">
                <span className="uppercase">Country</span>
                <p className="text-2xl text-gray-900 font-semibold pt-2">Japan</p>
            </div>
            <div className="pr-4">
                <span className="uppercase">Region</span>
                <p className="text-2xl text-gray-900 font-semibold pt-2">Kanto</p>
            </div>
            <div className="pr-4">
                <span className="uppercase">island</span>
                <p className="text-2xl text-gray-900 font-semibold pt-2">Honshu</p>
            </div>
        </div>
    )
}

export function Description({description}) {
    return(
        <div className="w-full sm: md:w-2/3 mt-16 text-gray-500 text-sm">
            Tokyo, Japan’s busy capital, mixes the ultramodern and the
            traditional, from neon-lit skyscrapers to historic temples. The
            opulent Meiji Shinto Shrine is known for its towering gate and
            surrounding woods. The Imperial Palace sits amid large public
            gardens
        </div>
    )
}

export function ReadMore({readMore}) {
    return(
        <button className="uppercase mt-5 text-sm font-semibold text-gray-200 hover:underline">
            Read More
        </button>
    )
}


export function Download({download}) {
    return(
        <button className="uppercase mt-5 text-lg font-semibold text-gray-200 hover:underline">
            Download
        </button>
    )
}

export function Purchase({price}) {
    //price by meduim? art -> $5 photos -> 25??
    return(
        <div className='group w-36'>
            <div className='block group-hover:hidden'>
                <button className="uppercase mt-5 text-lg font-semibold text-gray-200 hover:underline">
                    <div className='flex'>
                        <span>Purchase</span>
                    </div>
                </button>
            </div>
            <div className='hidden group-hover:block'>
                <Price/>
            </div>
        </div>
    )
}

export function Price({price}) {
    return(
        <button className="uppercase mt-5 text-lg font-semibold text-gray-200 hover:underline">
            <div className='relative h-fit w-fit'>
                <span>52,195 Satoshis</span>
                    <FontAwesomeIcon icon={faBitcoin} className='absolute h-5 w-5 -right-5 -top-1 text-orange-200'/>
            </div>
        </button>
    )
}

export function Art({art}) {
    const image =`https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
    return(
        <div className="relative bg-red-600 w-full md:w-1/2 h-screen max-h-[calc(100vh-64px)]">
                <Image
                    src={image}
                    alt={"Artical Featured Image"}
                    style={{ objectFit: 'cover', margin: '0' }} // navbar, lineheight, paddding, padding, padding?
                    fill={true}
                />
        </div>
    )
}


// export function Art({art}) {
//     return(
//         <div className="bg-red-600 w-full md:w-1/2 h-screen max-h-[calc(100vh-64px)]">
//             <img
//                 src={`https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
//                 className="h-screen max-h-[calc(100vh-64px)] w-full"
//                 alt=""
//             />
//         </div>
//     )
// }
