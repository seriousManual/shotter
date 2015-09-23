"use strict";

var Emitter = require('events').EventEmitter;
var async = require('async');

var Session = require('./models/Session');
var TestObject = require('./models/TestObject');

var shotter = require('./Shotter/shotter');
var compare = require('./Shotter/compare');
var combine = require('./Shotter/combine');

class SessionCreator extends Emitter {
    constructor(groups, options) {
        super();

        this._options = options || {};
        this._groups = groups;
        this._stats = null;
        this._currentState = 0;

        this._options.concurrency = this._options.concurrency || 4;
    }

    setGroups (groups) {
        this._groups = groups;
    }

    createSessionForGroups (callback) {
        async.eachLimit(this._groups, this._options.concurrency, (group, callback) => {
            this._createSessionForGroup(group, callback);
        }, callback);
    }

    _createSessionForGroup (group, callback) {
        var session = Session.createNewSession();
        group.addSession(session);
        session.setGroup(group);

        async.eachLimit(group.getSpec().getUrls(), this._options.concurrency, (url, callback) => {
            this._calcTestObject(group, session, url, callback);
        }, callback);
    }

    calcStats () {
        var points = 0;

        this._groups.forEach((group) => {
            points += (group.getSpec().getUrls().length * 3);
        });

        return points;
    }

    _calcTestObject (group, session, url, callback) {
        var testObject = TestObject.createNewTestObject(url);
        testObject.setSession(session);

        var latestNonNewSession = group.getLatestNonNewSession();
        var equivalentTestObject = latestNonNewSession ? latestNonNewSession.getEquivalentTestObject(testObject) : null;

        shotter(testObject, {}, (error) => {
            if (error) return callback(error);

            this._progress();

            if (equivalentTestObject) {
                compare(equivalentTestObject, testObject, (error, pathToDiffImage) => {
                    if (error) return callback(error);

                    this._progress();

                    combine(equivalentTestObject, testObject, pathToDiffImage, (error) => {
                        this._progress();
                        callback(error);
                    });
                });
            } else {
                this._progress();
                this._progress();
                callback(null);
            }
        });
    }

    _progress () {
        if (this._stats === null) {
            this._stats = this.calcStats();
        }

        this._currentState++;

        this.emit('progress', (this._currentState / this._stats) * 100);
    }
}


module.exports = SessionCreator;