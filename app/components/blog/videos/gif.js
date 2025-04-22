export function Gif({video, topTitle, bottomTitle}){
    return(
        <>
            { topTitle && <p className='m-0'>{topTitle}</p> }
            <div className='flex flex-col justify-center items-center'>
                <video 
                    width="1280" 
                    height="960" 
                    preload="none"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='m-0'
                >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            { bottomTitle && <p className='m-0'>{bottomTitle}</p> }
        </>
    )
}

