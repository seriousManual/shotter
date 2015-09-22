"use strict";

var util = require('util');
var Emitter = require('events').EventEmitter;
var async = require('async');

var Session = require('./Session');
var TestObject = require('./TestObject');

var shotter = require('./Shotter/shotter');
var compare = require('./Shotter/compare');
var combine = require('./Shotter/combine');

function SessionCreator (groups) {
    Emitter.call(this);
    this._groups = groups;
}

util.inherits(SessionCreator, Emitter);

SessionCreator.prototype.setGroups = function(groups) {
    this._groups = groups;
    this._stats = null;
    this._currentState = 0;
};

SessionCreator.prototype.createSessionForGroups = function (callback) {
    async.eachLimit(this._groups, 4, (group, callback) => {
        this._createSessionForGroup(group, callback);
    }, callback);
};

SessionCreator.prototype._createSessionForGroup = function (group, callback) {
    var session = Session.createNewSession();
    group.addSession(session);
    session.setGroup(group);

    async.eachLimit(group.getSpec(), 4, (url, callback) => {
        this._calcTestObject(group, session, url, callback);
    }, callback);
};

SessionCreator.prototype.calcStats = function () {
    var points = 0;

    this._groups.forEach((group) => {
        group.getSpec().forEach((entry) => {
            points += 3;
        });
    });

    return points;
};

SessionCreator.prototype._calcTestObject = function(group, session, url, callback) {
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
            callback(null);
        }
    });
};

SessionCreator.prototype._progress = function() {
    if (this._stats === null) {
        this._stats = this.calcStats();
    }

    this._currentState++;

    this.emit('progress', (this._currentState / this._stats) * 100);
};

module.exports = SessionCreator;