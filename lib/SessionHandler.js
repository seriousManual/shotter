"use strict";

var path = require('path');
var fs = require('fs');

var async = require('async');

var Group = require('./Group');
var Session = require('./Session');
var TestObject = require('./TestObject');

var tools = require('./tools');

class SessionHandler {
    constructor (basePath) {
        this._basePath = basePath;
    }

    readGroup (callback) {
        fs.readdir(this._basePath, (error, groupNames) => {
            if (error) return callback(error);

            async.map(groupNames, (groupName, callback) => {
                var group = new Group(this._basePath, groupName);

                var specFile = fs.readFileSync(tools.pathToSpec(group));
                var spec = JSON.parse(specFile);

                group.setSpec(spec);

                this._readSessions(group, (error) => {
                    callback(error || null, group);
                });
            }, (err, results) => {
                callback(err, results);
            });
        });
    }

    _readSessions (group, callback) {
        fs.readdir(tools.pathToGroup(group), (error, sessions) => {
            if (error) return callback(error);

            sessions = sessions.filter((session) => {
                return fs.lstatSync(path.join(this._basePath, group.getName(), session)).isDirectory()
            });

            async.map(sessions, (sessionName, callback) => {
                var session = new Session(sessionName);
                session.setGroup(group);

                group.addSession(session);
                this._readTestObjects(session, callback);
            }, (err, results) => {
                callback(err, results);
            });
        });
    }

    _readTestObjects (session, callback) {
        var basePath = tools.pathToSession(session);

        fs.readdir(basePath, (error, testObjects) => {
            if (error) return callback(error);

            testObjects = testObjects.filter((testObject) => {
                return !fs.lstatSync(path.join(tools.pathToSession(session), testObject)).isDirectory()
            });

            testObjects.forEach((testObjectName) => {
                var testObject = new TestObject(null, testObjectName);
                testObject.setSession(session);

                session.addTestObject(testObject);
            });

            callback(null);
        });
    }
}

module.exports = SessionHandler;