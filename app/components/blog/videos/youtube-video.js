export function YoutubeVideo({videoId}){
    const autoPlay = 'autoplay=0'
    const mute = 'mute=0'
    const loop = 'loop=0'
    const playlist = `playlist=${videoId}`
    const origin = 'origin=https://nashbrowns.com'

    return(
        <div className="flex justify-center items-center w-full">
            <iframe 
                src={`https://www.youtube.com/embed/${videoId}?si=1plKHiXuvLu5gtVo&${autoPlay}&${mute}&${loop}&${playlist}&${origin}`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                style={{aspectRatio: '16 / 9', width: '100%'}}
            />
        </div>
    )
}

