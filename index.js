const { parseString } = require('xml2js');
const fs = require('fs');

function ParseBounds(boundsTag) {
    const props = boundsTag[0]['$'];
    const bounds = {
        north: parseFloat(props.maxlat),
        south: parseFloat(props.minlat),
        west: parseFloat(props.minlon),
        east: parseFloat(props.maxlon),
    };
    bounds.width = bounds.east - bounds.west;
    bounds.height = bounds.north - bounds.south;

    Object.freeze(bounds);
    return bounds;
}

function ParseTrackPoint(trkpointTag) {
    const point = {
        latitude: parseFloat(trkpointTag['$'].lat),
        longitude: parseFloat(trkpointTag['$'].lon),
        elevation: parseFloat(trkpointTag.ele[0]),
        time: new Date(trkpointTag.time[0]),
    };
    Object.freeze(point);
    return point;
}

function ParseTrackSeg(trksegTag) {
    const points = trksegTag.trkpt.map(ParseTrackPoint);
    Object.freeze(points);
    return points;
}

function ParseTrack(trackTag) {
    const tracks = trackTag[0].trkseg.map(ParseTrackSeg);
    Object.freeze(tracks);
    return tracks;
}

function ConvertXML(xml) {
    const metadata = xml.gpx.metadata[0];
    const track = xml.gpx.trk;

    const bounds = ParseBounds(metadata.bounds);
    const time = new Date(metadata.time[0]);

    const TrackObject = {
        bounds,
        time,
        name: track[0].name[0],
        tracks: ParseTrack(track),
    };
    Object.freeze(TrackObject);
    return TrackObject;
}

function ParseGpxString(gpxString) {
    return new Promise((resolve, reject) => {
        parseString(gpxString, (err, xml) => {
            if (err) return reject(err);
            resolve(ConvertXML(xml));
        });
    });
}

function ParseGpxFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) return reject(err);

            parseString(data, (err, xml) => {
                if (err) return reject(err);

                resolve(ConvertXML(xml));
            });
        });
    });
}

ParseGpxString.parseFile = ParseGpxFile;
module.exports = ParseGpxString;