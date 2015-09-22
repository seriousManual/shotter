var makedirp = require('mkdirp');
var gm = require('gm').subClass({imageMagick: true});

var tools = require('../tools');

function combine(firstObject, testObject, pathToDiffImage, callback) {
    var resultsPath = tools.pathToSessionResult(testObject.getSession());
    var targetPath = tools.pathToTestObjectResult(testObject);

    makedirp(resultsPath, (error) => {
        if (error) return callback(error);

        gm(tools.pathToTestObject(firstObject))
            .append(tools.pathToTestObject(testObject), true)
            .append(pathToDiffImage, true)
            .write(targetPath, callback);
    });
}

module.exports = combine;