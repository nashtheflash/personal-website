'use client'

import { YouTubeEmbed } from '@next/third-parties/google'
import { useWindowSize } from '@/app/hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraMovie } from '@awesome.me/kit-237330da78/icons/classic/solid'


export function YoutubeVideo({videoId}){
    const { width, height } = useWindowSize();

    const autoPlay = 'autoplay=1'
    const mute = 'mute=0'
    const loop = 'loop=0'
    const playlist = `playlist=${videoId}`
    const origin = 'origin=https://nashbrowns.com'

    const embedParams = `${autoPlay}&${mute}&${loop}&${playlist}&${origin}`;

    return(
        <div className='flex justify-center items-center w-full'>
            <div className="h-fit w-fit bg-gray-400 bg-[url('/textures/default-noise-8.png')] bg-repeat bg-[length:50px] rounded-lg px-4 py-2 pb-5 my-4">
                { 
                    width > 768 ? 
                        <div className='flex justify-center items-center gap-4'>
                            <FontAwesomeIcon icon={faCameraMovie} className='h-10 w-10 pb-2 text-red-600'/>
                            <h2 className='text-center text-5xl font-mono font-bold my-6'>Watch On Youtube</h2>
                        </div> :
                        <div className='flex justify-center items-center gap-4'>
                            <FontAwesomeIcon icon={faCameraMovie} className='h-10 w-10 pb-2 text-red-600'/>
                            <h2 className='text-center text-5xl font-mono font-bold my-6'>YouTube</h2>
                        </div>
                }
                <div className='flex justify-center items-center'>
                    <YouTubeEmbed 
                        videoid={videoId} 
                        height={360} 
                        width={640} 
                        params={embedParams}
                    />
                </div>
            </div>
        </div>
    )
}





{/*

    This is the old component. I am keeping it because I think it looks better but it less performant. Might swap back later

*/}
// export function YoutubeVideo({videoId}){
//     const { width, height } = useWindowSize();
//
//     const autoPlay = 'autoplay=0'
//     const mute = 'mute=0'
//     const loop = 'loop=0'
//     const playlist = `playlist=${videoId}`
//     const origin = 'origin=https://nashbrowns.com'
//
//     return(
//         <div className="h-fit w-full bg-gray-400 bg-[url('/textures/default-noise-8.png')] bg-repeat bg-[length:50px] rounded-lg px-4 py-2 pb-5 my-4">
//             { 
//                 width > 768 ? 
//                     <div className='flex justify-center items-center gap-4'>
//                         <FontAwesomeIcon icon={faCameraMovie} className='h-10 w-10 pb-2 text-red-600'/>
//                         <h2 className='text-center text-5xl font-mono font-bold my-6'>Watch On Youtube</h2>
//                     </div> :
//                     <div className='flex justify-center items-center gap-4'>
//                         <FontAwesomeIcon icon={faCameraMovie} className='h-10 w-10 pb-2 text-red-600'/>
//                         <h2 className='text-center text-5xl font-mono font-bold my-6'>YouTube</h2>
//                     </div>
//             }
//             <div className="flex justify-center items-center w-full">
//                 <iframe 
//                     src={`https://www.youtube.com/embed/${videoId}?si=1plKHiXuvLu5gtVo&${autoPlay}&${mute}&${loop}&${playlist}&${origin}`}
//                     title="YouTube video player" 
//                     frameBorder="0" 
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//                     referrerPolicy="strict-origin-when-cross-origin" 
//                     allowFullScreen
//                     style={{aspectRatio: '16 / 9', width: '100%'}}
//                 />
//             </div>
//         </div>
//     )
// }
