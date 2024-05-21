import { GoogleMap } from '../general/google-map';

export function BlogMapWrapper({
    width='w-96',
    height='h-96',
    alignment='center',
    text,
    mapUrl
} ={}) {
    return(
        <div className='flex justify-around items-start gap-2'>
            {text && <p className='m-0'>{text}</p>}

            <div className={`flex ${alignment == 'right' ? 'justify-start' : alignment == 'right' ? 'justify-end' : 'justify-center'} items-center`}>
                <div className={`${height} ${width}`}>
                    <GoogleMap
                        url={mapUrl}
                    />
                </div>
            </div>
        </div>
    )
}
