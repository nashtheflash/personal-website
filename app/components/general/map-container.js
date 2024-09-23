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
                trackData ? <MapBox mapHeight={mapHeight} gpxData={trackData}/> : <h1>Loading</h1>
            }
        </>
    )
}
