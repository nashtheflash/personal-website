'use client'

import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';
import {MapIcon, InformationCircleIcon} from '@heroicons/react/24/outline'

import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapBox({mapHeight, gpxData}) {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const mapContainer = useRef(null);
    const map = useRef(null);
    
    const [mapLoaded, setMapLoaded] = useState(false);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [currentTrack, setCurrentTrack] = useState(gpxData);
    
    useEffect(() => {
        
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [lng, lat],
            zoom: zoom
        });
    
        map.current.on('load', () => {
            setMapLoaded(true);
            
            currentTrack.forEach(track => {
                const layerName = track.name;

                map.current.addSource(layerName, {
                    type: 'geojson',
                    data: track.data
                });

                map.current.addLayer({
                    id: layerName,
                    type: 'line',
                    source: layerName,
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#888',
                        'line-width': 4
                    }
                });
            });
        });
    });

    //used to show and hide layers
    useEffect(() => {
        if (!mapLoaded) return;

        currentTrack.forEach((track) => {
            if (track.active == 1) {
                map.current.setLayoutProperty(track.name, 'visibility', 'visible');
            } else {
                map.current.setLayoutProperty(track.name, 'visibility', 'none');
            }
        });
    }, [currentTrack]);

    return( 
        <div className="w-full h-full p-5">
            <MapSelect trails={gpxData} setCurrentTrack={setCurrentTrack}/>
            <div className=''>
                <div ref={mapContainer} className={`map-container h-[${mapHeight}px]`} />
            </div>
            <MapAction tracks={currentTrack}/>
        </div>
    )
}

export function MapSelect({trails, setCurrentTrack}) {
    return(
        <div className="grid grid-cols-3 justify-center justify-items-center items-start gap-1 py-3 text-black">
            <h1 className='col-span-3'>TRAILS</h1>
            <button className="" onClick={() => selectAllTracks(setCurrentTrack)}>All Trails</button>
            {
               trails && trails.map(trail => {
                    return (
                        <button 
                            key={trail.name}
                            className="" 
                            onClick={() => handleTrackChange(setCurrentTrack, trail.name)}
                        >{trail.name}</button>
                    )
               })
            }
        </div>
    )
}

const handleTrackChange = (setTrack, activate) => {
    setTrack(allTracks => 
        allTracks.map((track) => ({
            ...track,
            active: track.name == activate ? 1 : 0
        }))
    )
}

const selectAllTracks = (setTrack) => {
    setTrack(allTracks => 
        allTracks.map((track) => ({
            ...track,
            active: 1
        }))
    )
}

export function MapAction({tracks}) {
    const selectedTrack = tracks.find((track) => track.active == 1);

    return(
        <div className="flex justify-center items-center gap-3 py-3 text-black">
            <a href={selectedTrack.url} download>
                <button className="btn btn-neutral">
                    <MapIcon className='w-5 h-5'/>
                    Download GPX
                </button>
            </a>
            <button className="btn btn-neutral">
                <InformationCircleIcon className='w-5 h-5'/>
                Help
            </button>
        </div>
    )
}
