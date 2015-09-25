"use strict"

class Group {
    constructor (basePath, name, isNewGroup) {
        isNewGroup = isNewGroup || false

        this._basePath = basePath
        this._name = name
        this._sessions = []
        this._isNewGroup = isNewGroup
        this._spec = []
    }

    getName () {
        return this._name
    }

    isNewGroup () {
        return this._isNewGroup
    }

    addSession (session) {
        this._sessions.push(session)
    }

    getSessions () {
        return this._sessions;
    }

    getSpec () {
        return this._spec
    }

    setSpec (spec) {
        this._spec = spec
    }

    getBasePath () {
        return this._basePath
    }

    getLatestNonNewSession () {
        return this._sessions
            .filter((session) => !session.isNewSession())
            .reduce((carry, session) => {
                if (carry === null || parseInt(session.getIdentifier(), 10) > parseInt(carry.getIdentifier(), 10)) return session

                return carry
            }, null)
    }
}

module.exports = Group