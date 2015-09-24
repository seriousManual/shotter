var util = require('util')
var path = require('path');

var tools = {
    pathToGroup: (group) => path.join(group.getBasePath(), group.getName()),
    pathToSpec: (group) => path.join(group.getBasePath(), group.getName(), '.spec.json'),

    pathToSession: (session) => path.join(tools.pathToGroup(session.getGroup()), session.getIdentifier()),
    pathToSessionResult: (session) => path.join(tools.pathToSession(session), 'results'),

    pathToTestObject: (testObject) => path.join(tools.pathToSession(testObject.getSession()), testObject.getFileName()),
    pathToTestObjectDiff: (testObject) => path.join(tools.pathToSession(testObject.getSession()), 'diffs', testObject.getFileName()),
    pathToTestObjectResult: (testObject) => path.join(tools.pathToSessionResult(testObject.getSession()), testObject.getFileName()),

    pad: (nr) => {
        nr = parseInt(nr, 10)

        if (nr < 10) return '0' + String(nr)

        return String(nr)
    },

    timeKey: () => {
        var d = new Date();

        return util.format('%s%s%s%s%s%s', d.getFullYear(),
            tools.pad(d.getMonth() + 1),
            tools.pad(d.getDate()),
            tools.pad(d.getHours()),
            tools.pad(d.getMinutes()),
            tools.pad(d.getSeconds()))
    }
};

module.exports = tools;