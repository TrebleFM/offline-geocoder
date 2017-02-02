#!/usr/bin/env node

"use strict";

const Geocoder = require("../src/index.js");
const args = process.argv.slice(2);

if (args.length !== 2) {
    console.log("Usage: geocoder [latitude] [longitude]");
    process.exit(1);
}

const geocoder = new Geocoder({ database: `${__dirname}/../db.sqlite` });
const LOOPS = 1000;
const start = Date.now();
let i = 0;

function loop() {
    if (++i >= LOOPS) {
        const timeinSecs = (Date.now() - start) / 1000;
        const lookupsPerSecond = (i / timeinSecs).toFixed(2);
        console.log(`${lookupsPerSecond} lookups per second`);
        process.exit(0);
    }

    geocoder.reverse(args[0], args[1])
        .then(() => loop())
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}

loop();
