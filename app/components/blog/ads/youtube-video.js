'use client'

import { useWindowSize } from '@/app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faArrowRight,
    faArrowDown,
} from '@awesome.me/kit-237330da78/icons/classic/light'

export function YoutubeAd({videoID, description}) {
    const videoURL = `https://www.youtube.com/watch?v=${videoID}`;
    const videoThumbnail = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;

    const autoPlay = 'autoplay=0'
    const mute = 'mute=0'
    const loop = 'loop=0'
    const playlist = `playlist=${videoID}`
    const origin = 'origin=https://nashbrowns.com'

    const { width, height } = useWindowSize();

    return(
        <div className="h-fit w-full my-10 bg-[#d0cfcd] border-[#d0cfcd] rounded-box p-6">
            <div className="flex flex-col gap-5 md:flex-row justify-between items-center w-full">
                <div className='flex flex-col items-center justify-center md:justify-start md:items-start'>
                    <h1 className='text-gray-700 mb-0'>Rather Watch?</h1>
                    <span>{description}</span>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    { width > 768 ? <FontAwesomeIcon icon={faArrowRight} className='h-12 w-12'/> : <FontAwesomeIcon icon={faArrowDown} className='h-12 w-12'/>}
                    <span>Click the video to go to Youtube</span>
                </div>
                <div>
                    <a href={videoURL} className='block'>
                        <iframe 
                            src={`https://www.youtube.com/embed/${videoID}?si=1plKHiXuvLu5gtVo&${autoPlay}&${mute}&${loop}&${playlist}&${origin}`}
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                            className='pointer-events-none'
                            style={{aspectRatio: '16 / 9', width: '100%'}}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}
