'use client'

import { useEffect } from 'react';
import Script from 'next/script';

export function StravaGarmin({ stravaId, garminId }) {
  useEffect(() => {
    // Resize Strava iframe after it's injected
    const timeout = setTimeout(() => {
      const iframe = document.querySelector('.strava-embed-placeholder iframe');
      if (iframe) {
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.removeAttribute('width');
        iframe.removeAttribute('height');
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full h-fit sm:h-[695px]">
      {/* Strava Embed */}
      <div className="w-full h-[695px] max-h-fit sm:h-full sm:w-1/2 ">
        <div
          className="absolute inset-0 strava-embed-placeholder"
          data-embed-type="activity"
          data-embed-id={stravaId}
          data-style="standard"
          data-from-embed="false"
        />
        <Script src="https://strava-embeds.com/embed.js" />
      </div>

      {/* Garmin Embed */}
      <div className="w-full h-[500px] sm:h-full sm:w-1/2">
        <iframe
          src={`https://connect.garmin.com/modern/activity/embed/${garminId}`}
          className="inset-0 w-full h-full"
          title="Activity Embed"
          frameBorder="0"
          scrolling="no"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
}
