import { GoogleMap } from '../general/google-map';

export function BlogMapWrapper({
    width='w-full',
    height='h-[500px]',
    alignment='center',
    text,
    mapUrl,
} ={}) {
    return(
        <div className='flex justify-around items-start gap-2'>
            {text && <p className='m-0'>{text}</p>}

            <div className={`${height} ${width}`}>
                <GoogleMap
                    url={mapUrl}
                />
            </div>
        </div>
    )
}
