var path = require('path');

var imageDiff = require('image-diff');

var tools = require('../tools');

function diff(testObject1, testObject2, callback) {
    var pathToDiffImage = path.join(tools.pathToSession(testObject2.getSession()), 'diff_' + testObject2.getFileName());

    imageDiff({
        expectedImage: tools.pathToTestObject(testObject1),
        actualImage: tools.pathToTestObject(testObject2),
        diffImage: pathToDiffImage,
        shadow: true
    }, function (error, imagesAreSame) {
        callback(error || null, error ? null : pathToDiffImage);
    });
}

module.exports = diff;