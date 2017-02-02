# Offline Geocoder

Node library for reverse geocoding. Designed to be used offline (for example embedded in a desktop or mobile
application) - no web requests are made to perform a lookup.

## Data

This uses data from the [GeoNames project](http://www.geonames.org/), which is free to use under the
[Creative Commons Attribution 3.0 license](http://creativecommons.org/licenses/by/3.0/). To enable this to work offline,
the data is imported into a SQLite database which is roughly 12 MB, so easily embeddable within an application. If you
use this data, you must give attribution, as specified by the license.

By default it uses the `cities1000` dataset which contains details of all worldwide cities with a population of at least
1000 people. Depending on your needs you may get better performance or accuracy by using one of their other datasets.

The GeoNames data is limited to city-level granularity, so if you need street level accuracy this won't work for you.
Also most data is only available in English. Take a look at the
[OpenStreetMap Nominatim project](https://github.com/twain47/Nominatim) for a similar tool with a lot more features.

The advantages of this working offline are you don't need to pay or obtain a license key, and it's fast. On a 2015
MacBook Pro, the `geocoder-benchmark` tool achieves ~540 lookups per second using the `cities1000` dataset.

## Installation

```
npm install --save @treblefm/offline-geocoder
```

A database with the latest data will be generated automatically as a `postinstall` step. An internet connection is
required for this succeed.

## Usage

When you initialize the library you need to pass the location of the database:

```js
const Geocoder = require("offline-geocoder");
let geocoder = new Geocoder({ database: "data/geodata.sqlite" });
```

### Reverse Geocoding

To perform a reverse geocode lookup just pass the coordinates:

```js
geocoder.reverse(41.89, 12.49)
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Which outputs:

```json
{
  "formatted": "Rome, Latium, Italy",
  "city": {
    "id": 3169070,
    "name": "Rome"
  },
  "region": {
    "id": 7,
    "name": "Latium"
  },
  "country": {
    "id": "IT",
    "name": "Italy"
  },
  "coordinates": {
    "latitude": 41.89193,
    "longitude": 12.51133
  }
}
```

## License

This library is licensed under [the MIT license](https://github.com/lucaspiller/offline-geocoder/blob/master/LICENSE).
