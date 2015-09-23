"use strict";

class Spec {
    constructor(data) {
        if (!data.urls || !Array.isArray(data.urls)) {
            throw new Error('field urls is missing')
        }

        this._urls = data.urls;
    }

    getUrls() {
        return this._urls;
    }
}

module.exports = Spec;