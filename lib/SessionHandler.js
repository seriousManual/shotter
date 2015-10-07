"use strict";

var path = require('path');
var fs = require('fs');

var async = require('async');

var readSpec = require('./readSpec');
var Group = require('./models/Group');
var Session = require('./models/Session');
var TestObject = require('./models/TestObject');

var tools = require('./tools');

class SessionHandler {
    constructor (basePath) {
        this._basePath = basePath;
    }

    readGroup (callback) {
        fs.readdir(this._basePath, (error, groupNames) => {
            if (error) return callback(error);

            if ( groupNames.indexOf( '.spec.json' ) !== -1 )
                groupNames = [ './' ];

            async.map(groupNames, (groupName, callback) => {
                var group = new Group(this._basePath, groupName);

                async.parallel([
                    (callback) => this._readSessions(group, callback),
                    (callback) => readSpec(group, (error, spec) => {
                        if (error) return callback(error);

                        group.setSpec(spec);
                        callback();
                    })
                ], (error) => callback(error || null, !error ? group : null));
            }, callback);
        });
    }

    _readSessions (group, callback) {
        fs.readdir(tools.pathToGroup(group), (error, sessions) => {
            if (error) return callback(error);

            sessions = sessions.filter((session) => fs.lstatSync(path.join(tools.pathToGroup(group), session)).isDirectory());

            async.map(sessions, (sessionName, callback) => {
                var session = new Session(sessionName);
                session.setGroup(group);

                group.addSession(session);
                this._readTestObjects(session, callback);
            }, callback);
        });
    }

    _readTestObjects (session, callback) {
        var basePath = tools.pathToSession(session);

        fs.readdir(basePath, (error, testObjects) => {
            if (error) return callback(error);

            testObjects = testObjects.filter((testObject) => !fs.lstatSync(path.join(tools.pathToSession(session), testObject)).isDirectory());

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