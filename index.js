var SessionHandler = require('./lib/SessionHandler');
var SessionCreator = require('./lib/SessionCreator');

function shotter(dir, callback) {
    var sh = new SessionHandler(dir);
    var sc = new SessionCreator();

    sh.readGroup((err, groups) => {
        sc.setGroups(groups);

        sc.emit('initialize');
        sc.createSessionForGroups(callback);
    });

    return sc;
}

module.exports = shotter;