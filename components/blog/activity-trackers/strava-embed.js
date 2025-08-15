import Script from 'next/script';

export async function StravaEmbed({dataEmbedId}) {

    return (
        <div className='flex justify-center items-center'>
            <div 
                className="strava-embed-placeholder" 
                data-embed-type="activity" 
                data-embed-id={dataEmbedId}
                data-style="standard" 
                data-from-embed="false"
            />
            <Script src="https://strava-embeds.com/embed.js"/>
        </div>
    )

}
