'use client'

import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';
import { BlackTieTitle } from '../blog/section-headers/black-tie';
import {MapIcon, InformationCircleIcon} from '@heroicons/react/24/outline'

import 'mapbox-gl/dist/mapbox-gl.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MapBox({ data, geoJsonTracks }) {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const mapContainer = useRef(null);
    const map = useRef(null);
    
    const [mapLoaded, setMapLoaded] = useState(false);
    const [lng, setLng] = useState(data.mapStartingLon);
    const [lat, setLat] = useState(data.mapStartingLat);
    const [zoom, setZoom] = useState(data.mapZoom);
    const [currentTracks, setCurrentTracks] = useState(geoJsonTracks);

    useEffect(() => {
        setLng(data.mapStartingLon);
        setLat(data.mapStartingLat);
        setZoom(data.mapZoom);

        //if the data changes all of the layers need to be cleared
        if(mapLoaded) {
            const oldLayers = map.current.getStyle().layers.filter((layer) => layer.source != 'composite' && layer.type == 'line')

            oldLayers.forEach((layer) => {
                map.current.removeLayer(layer.id);
                map.current.removeSource(layer.id);   
            });

            //moves the map to the next location
            map.current.flyTo({
                center: [data.mapStartingLon, data.mapStartingLat],
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
        }

     }, [data])
    
    useEffect(() => {
        //adds the new layers to the map note: geoJsonTracks is useState so must be updated independantly of data
        if(mapLoaded) {
            setCurrentTracks(geoJsonTracks)
            geoJsonTracks.forEach(track => {
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
                        'line-color':   track.difficulty == 'easy' ? '#22c55e' : 
                                        track.difficulty == 'medium' ? '#3b82f6' : 
                                        track.difficulty == 'hard' ? '#000000' : 
                                        track.difficulty == 'expert' ? '#ef4444' : 
                                        '#888',
                        'line-width': 4,
                    }
                });
                
                var popup;
                
                //mouse over events
                map.current.on('mouseover', layerName, function (e) {
                    popup = new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(`<h2>${layerName}</h2>`)
                        .addTo(map.current);

                    map.current.setPaintProperty(layerName, 'line-width', 8); // Set width to 8 on hover
                });

                map.current.on('mouseout', layerName, function (e) {
                    if (popup) popup.remove();
                    map.current.setPaintProperty(layerName, 'line-width', 4); // Set width to 8 on hover
                });
            });
        }
    }, [geoJsonTracks])

    useEffect(() => {
        if (map.current) return; // initialize map only once

        //Base map settings
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [lng, lat],
            zoom: zoom
        });
    
        //once the map is loaded start drawing the tracks
        map.current.on('load', () => {
            setMapLoaded(true);

            currentTracks.forEach(track => {
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
                        'line-color':   track.difficulty == 'easy' ? '#22c55e' : 
                                        track.difficulty == 'medium' ? '#3b82f6' : 
                                        track.difficulty == 'hard' ? '#000000' : 
                                        track.difficulty == 'expert' ? '#ef4444' : 
                                        '#888',
                        'line-width': 4,
                    }
                });
                
                var popup;
                
                //mouse over events
                map.current.on('mouseover', layerName, function (e) {
                    popup = new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(`<h2>${layerName}</h2>`)
                        .addTo(map.current);

                    map.current.setPaintProperty(layerName, 'line-width', 8); // Set width to 8 on hover
                });

                map.current.on('mouseout', layerName, function (e) {
                    if (popup) popup.remove();
                    map.current.setPaintProperty(layerName, 'line-width', 4); // Set width to 8 on hover
                });
            });
        });
    });

    //used to show and hide layers
    useEffect(() => {
        if (!mapLoaded) return;

        currentTracks.forEach((track) => {
            if (track.active == 1) {
                map.current.setLayoutProperty(track.name, 'visibility', 'visible');
            } else {
                map.current.setLayoutProperty(track.name, 'visibility', 'none');
            }
        });
    }, [currentTracks]);

    return( 
        <div className="w-full h-full p-5">
            <MapSelect trails={data.gpxTracks} setCurrentTracks={setCurrentTracks}/>
            <div className='text-black'>
                <div ref={mapContainer} className={`map-container h-[400px]`} />
            </div>
            <MapAction tracks={currentTracks}/>
        </div>
    )
}

function MapSelect({trails, setCurrentTracks}) {
    return(
        <div className="grid grid-cols-3 justify-center justify-items-center items-start gap-1 py-3 text-black">
            <div className='col-span-3'>
                <BlackTieTitle title='TRAILS'/>
            </div>
            <button className="" onClick={() => selectAllTracks(setCurrentTracks)}>All Trails</button>
            {
               trails && trails.map(trail => {
                    return (
                        <button 
                            key={trail.name}
                            className="" 
                            onClick={() => handleTrackChange(setCurrentTracks, trail.name)}
                        >
                            <div className='flex gap-1 justify-center items-center'>
                                {trail.name}
                                <div className={
                                    classNames(
                                        trail.difficulty == 'easy' ? "w-2 h-2 bg-green-500 transform rotate-45" :
                                        trail.difficulty == 'medium' ? "w-2 h-2 bg-blue-500 transform rotate-45" :
                                        trail.difficulty == 'hard' ? "w-2 h-2 bg-black transform rotate-45" :
                                        trail.difficulty == 'expert' ? "w-2 h-2 bg-red-500 transform rotate-45" :
                                        "w-2 h-2 bg-purple-500 transform rotate-45"
                                    )}
                                />
                            </div>
                        </button>
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
        <div className="flex justify-center items-center gap-3 py-3 mb-3 text-black">
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
