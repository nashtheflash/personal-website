"use client";
import { useEffect, useState } from "react";
import { getTrack } from "./server-action";
import MapBox from "./mapbox";

export default function Map({mapHeight, tracks}) {
    const [trackData, setTrackData] = useState();

    async function getTrackData() {
        const allTracks = await getTrack(tracks);
        setTrackData(allTracks)
    }
    
    useEffect(() => {
        getTrackData()
    }, []);

    return(
        <>
            {
                trackData ? <MapBox mapHeight={mapHeight} gpxData={trackData}/> : <MapLoading mapHeight={mapHeight}/>
            }
        </>
    )
}


function MapLoading({mapHeight}) {
    return(
        <div className={`flex flex-col justify-center items-center text-gray-500 h-[${mapHeight}px]`}>
            <h3>Loading Map</h3>
            <span className="loading loading-ring loading-lg"></span>
        </div>
    )
}
