'use client'

import Script from 'next/script';

export function Strava({ stravaId }) {

    return (
        <div className="flex justify-center w-full">
            <div className="strava-embed-placeholder w-full max-w-2xl"
                data-embed-type="activity"
                data-embed-id={stravaId}
                data-style="standard"
                data-from-embed="false"
            />
            <Script src="https://strava-embeds.com/embed.js" />
        </div>
    );
}
