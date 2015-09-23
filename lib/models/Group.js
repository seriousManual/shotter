"use strict";

class Group {
    constructor (basePath, name, isNewGroup) {
        isNewGroup = isNewGroup || false;

        this._basePath = basePath;
        this._name = name;
        this._sessions = [];
        this._isNewGroup = isNewGroup;
        this._spec = [];
    }

    getName () {
        return this._name;
    }

    getSpec () {
        return this._spec;
    }

    isNewGroup () {
        return this._isNewGroup;
    }

    addSession (session) {
        this._sessions.push(session);
    }

    setSpec (spec) {
        this._spec = spec;
    }

    getBasePath () {
        return this._basePath;
    }

    getLatestNonNewSession () {
        return this._sessions
            .filter((session) => !session.isNewSession())
            .reduce((carry, session) => {
                if (parseInt(session.getIdentifier(), 10) > 0)  return session;

                return carry;
            }, 0);
    }
}

module.exports = Group;