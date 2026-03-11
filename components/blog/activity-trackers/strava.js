'use client'

import { useEffect } from 'react';

const STRAVA_SCRIPT_SRC = 'https://strava-embeds.com/embed.js';

export function Strava({ stravaId }) {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = STRAVA_SCRIPT_SRC;
        script.async = true;
        document.body.appendChild(script);

        return () => script.remove();
    }, [stravaId]);

    return (
        <div className="flex justify-center w-full">
            <div className="strava-embed-placeholder w-full max-w-2xl"
                data-embed-type="activity"
                data-embed-id={stravaId}
                data-style="standard"
                data-from-embed="false"
            />
        </div>
    );
}
