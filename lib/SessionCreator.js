"use strict";

var util = require('util');
var Emitter = require('events').EventEmitter;
var async = require('async');

var Session = require('./Session');
var TestObject = require('./TestObject');

var tools = require('./tools');
var shotter = require('./Shotter/shotter');
var compare = require('./Shotter/compare');
var combine = require('./Shotter/combine');

function SessionCreator (groups) {
    Emitter.call(this);
    this._groups = groups;
}

util.inherits(SessionCreator, Emitter);

SessionCreator.prototype.createSessionForGroups = function (callback) {
    async.eachLimit(this._groups, 4, (group, callback) => {
        this.createSessionForGroup(group, callback);
    }, callback);
};

SessionCreator.prototype.createSessionForGroup = function (group, callback) {
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

        this.emit('progress');

        if (equivalentTestObject) {
            compare(equivalentTestObject, testObject, (error, pathToDiffImage) => {
                if (error) return callback(error);

                this.emit('progress');

                combine(equivalentTestObject, testObject, pathToDiffImage, (error) => {
                    this.emit('progress');
                    callback(error);
                });
            });
        } else {
            this.emit('progress');
            callback(null);
        }
    });
};

module.exports = SessionCreator;