import { gpx } from "@tmcw/togeojson";
import MapBox from "./mapbox"

export default async function Map({mapHeight, tracks}) {
    //build and array of tracks to convert
    const gpxTracks = tracks.map(track => gpxToGeoJson(track));

    return(
        <MapBox mapHeight={mapHeight} tracks={gpxTracks}/>
    )
}

//get gpx file and convert it to a geojson
function gpxToGeoJson(track) {
    const gpxFile = fetchGPX(track);

    const geoJson = gpx(gpxFile);
    return geoJson;

}

//Fetch a GPX file could be any type of file is needed
const fetchGPX = (file) => {
    const fs = require("fs");
    var path = require("path");
    const DOMParser = require("xmldom").DOMParser;
    const rootPath = process.cwd();

    const gpxFile = new DOMParser().parseFromString(fs.readFileSync(path.resolve(`${rootPath}${file}`), "utf8"));

    return gpxFile;

}
