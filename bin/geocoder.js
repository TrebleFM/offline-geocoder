#!/usr/bin/env node

"use strict";

const Geocoder = require("../src/index.js");
const args = process.argv.slice(2);

if (args.length !== 2) {
    console.log("Usage: geocoder [latitude] [longitude]");
    process.exit(1);
}

const geocoder = new Geocoder({ database: `${__dirname}/../data/db.sqlite` });
geocoder.reverse(args[0], args[1])
    .then((result) => {
        console.log(JSON.stringify(result, null, 2));
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
