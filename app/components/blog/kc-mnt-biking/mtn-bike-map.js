import Map from '@/app/components/general/map-container';

export function MtnBikeMap({gpxTracks}) {
    return(
        <Map mapHeight='400' tracks={gpxTracks}/>
    )
}
