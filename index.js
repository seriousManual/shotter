var SessionHandler = require('./lib/SessionHandler')
var SessionCreator = require('./lib/SessionCreator')

function shotter(dir, callback) {
    callback = callback || function() {}

    var sh = new SessionHandler(dir)
    var sc = new SessionCreator()

    sh.readGroup((error, groups) => {
        if (error) return callback(error)

        sc.setGroups(groups)

        sc.emit('initialize')
        sc.createSessionForGroups(callback)
    })

    return sc
}

module.exports = shotter