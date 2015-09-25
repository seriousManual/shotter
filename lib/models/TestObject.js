"use strict"

var crypto = require('crypto')

class TestObject {
    static createNewTestObject (url) {
        return new TestObject(url, null, true)
    }

    constructor (url, fileName, isNewTestObject) {
        isNewTestObject = isNewTestObject || false

        this._url = url
        this._fileName = fileName
        this._session = null
        this._isNewTestObject = isNewTestObject
    }

    getUrl () {
        return this._url
    }

    getFileName () {
        if (!this._fileName) {
            this._fileName = crypto.createHash('md5')
                .update(this.getUrl())
                .digest("hex") + '.png'
        }

        return this._fileName
    }

    isNewTestObject () {
        return this._isNewTestObject
    }

    setSession (session) {
        this._session = session
    }

    getSession () {
        return this._session
    }
}

module.exports = TestObject