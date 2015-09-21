var path = require('path');
var gm = require('gm').subClass({imageMagick: true});

var tools = require('../tools');

function combine(firstObject, testObject, pathToDiffImage, callback) {
    var targetPath = path.join(process.cwd(), tools.pathToSession(testObject.getSession()), 'result_' + testObject.getFileName());

    gm(tools.pathToTestObject(firstObject))
        .append(tools.pathToTestObject(testObject), true)
        .append(pathToDiffImage, true)
        .write(targetPath, callback);
}

module.exports = combine;