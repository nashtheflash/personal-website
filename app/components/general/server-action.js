"use server"
import { gpx } from "@tmcw/togeojson";

export async function getTrack(trk) {
    return trk.map((track) => ({
            ...track,
            data: gpxToGeoJson(track.url),
            active: 1
        })
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

    const gpxFile = new DOMParser().parseFromString(fs.readFileSync(path.resolve(`${rootPath}/public${file}`), "utf8"));

    return gpxFile;

}
