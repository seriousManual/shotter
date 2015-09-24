"use strict";

var tools = require('../tools');

class Session {

    static createIdentfier () {
        return tools.timeKey();
    }

    static createNewSession () {
        return new Session(null, true);
    }

    constructor (identifier, isNewSession) {
        isNewSession = isNewSession || false;

        this._identifier = identifier || Session.createIdentfier();
        this._testObjects = [];
        this._group = null;
        this._isNewSession = isNewSession;
    }

    getIdentifier () {
        return this._identifier;
    }

    isNewSession () {
        return this._isNewSession;
    }

    addTestObject (testObject) {
        this._testObjects.push(testObject);
    }

    setGroup (group) {
        this._group = group;
    }

    getGroup () {
        return this._group;
    }

    getEquivalentTestObject (findObject) {
        return this._testObjects.find((testObject) => testObject.getFileName() == findObject.getFileName());
    }
}

module.exports = Session;