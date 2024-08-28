'use client'

import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapBox({mapHeight, tracks}) {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const mapContainer = useRef(null);
    const map = useRef(null);
    
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [track, setTrack] = useState();
    
    useEffect(() => {
        
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [lng, lat],
            zoom: zoom
        });
    
        tracks.forEach((track, i) => {
            const layerName = 'route' + i;

            map.current.on('load', () => {
                map.current.addSource(layerName, {
                    type: 'geojson',
                    data: track
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
    
    return(
        <div>
            <div ref={mapContainer} className={`map-container h-[${mapHeight}px]`} />
        </div>
    )
}
