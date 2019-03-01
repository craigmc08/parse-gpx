# parse-gpx
A parser for the `.gpx` file format.

*Disclaimer: The gpx specification wasn't used to make this. It was written from a single gpx file and is for personal use. Use at your own risk.*

## usage
First, install the package:
```sh
npm install @craigmc08/parse-gpx
```

Then, import it into your code and give it a string:
```js
const parseGpx = require('@craigmc08/parse-gpx');
parseGpx('<gpx xml string>').then(gpx => doSomethingWithThe(gpx));

// Alternatively, use the file parser:
const parseGpxFile = require('@craigmc08/parse-gpx').parseFile;
parseFile('./my-gpx-file.gpx').then(gpx => doSomethingWithThe(gpx));
```

Here's what the `gpx` object looks like:
### gpx
#### bounds
- `north` - Highest latitude
- `south` - Lowest latitude
- `west` - Lowest longitude
- `east` - Highest longitude
- `height` - Difference between latitudes
- `width` - Difference between longitudes

#### time
Javascript date representing time it started

#### name
Name of track

#### tracks
Array of track segments, each containing a [TrackPoint](#track-point)

#### Track Point
- `latitude`
- `longitude`
- `elevation`
- `time` - Javascript date

## contributing
Just submit a pull request. Please try to include what your changes do and why.

Also, ignore that the `test/` dir is in the .gitignore. That's not done yet.