export function YoutubeVideo({videoId}){
    return(
        <div className="flex justify-center items-center w-full">
            <iframe 
                src={`https://www.youtube.com/embed/${videoId}?si=1plKHiXuvLu5gtVo&autoplay=1&mute=1&loop=1&&playlist=${videoId}&origin=https://nashbrowns.com`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                style={{aspectRatio: '16 / 9', width: '100%'}}
            />
        </div>
    )
}

