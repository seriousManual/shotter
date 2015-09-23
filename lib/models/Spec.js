"use strict";

class Spec {
    constructor(data) {
        this._urls = data.urls;
    }

    getUrls() {
        return this._urls;
    }
}

module.exports = Spec;