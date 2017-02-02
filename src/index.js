"use strict";

const sqlite3 = require("sqlite3").verbose();
const reverse = require("./reverse");
const findLocation = require("./location").find;

const Geocoder = function (options) {
    this.options = options || {};

    if (!this.options.database) {
        this.options.database = `${__dirname}/../data/db.sqlite`;
    }

    this.db = new sqlite3.Database(this.options.database);
};

Geocoder.prototype.reverse = function (latitude, longitude) {
    return reverse(this, latitude, longitude);
};

Geocoder.prototype.location = function () {
    return {
        find: (locationId) => findLocation(this, locationId)
    };
};

module.exports = Geocoder;
