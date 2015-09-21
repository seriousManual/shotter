var path = require('path');

var tools = {
    pathToGroup: (group) => path.join(group.getBasePath(), group.getName()),
    pathToSpec: (group) => path.join(group.getBasePath(), group.getName(), '.spec.json'),

    pathToSession: (session) => path.join(tools.pathToGroup(session.getGroup()), session.getIdentifier()),
    pathToTestObject: (testObject) => path.join(tools.pathToSession(testObject.getSession()), testObject.getFileName())
};

module.exports = tools;