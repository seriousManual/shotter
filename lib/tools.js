var path = require('path');

var tools = {
    pathToGroup: (group) => path.join(group.getBasePath(), group.getName()),
    pathToSpec: (group) => path.join(group.getBasePath(), group.getName(), '.spec.json'),

    pathToSession: (session) => path.join(tools.pathToGroup(session.getGroup()), session.getIdentifier()),
    pathToSessionResult: (session) => path.join(tools.pathToSession(session), 'results'),

    pathToTestObject: (testObject) => path.join(tools.pathToSession(testObject.getSession()), testObject.getFileName()),
    pathToTestObjectDiff: (testObject) => path.join(tools.pathToSession(testObject.getSession()), 'diffs', testObject.getFileName()),
    pathToTestObjectResult: (testObject) => path.join(tools.pathToSessionResult(testObject.getSession()), testObject.getFileName())
};

module.exports = tools;