var path = require('path');

var imageDiff = require('image-diff');

var tools = require('../tools');

function diff(testObject1, testObject2, callback) {
    var pathToDiffImage = tools.pathToTestObjectDiff(testObject2);

    imageDiff({
        expectedImage: tools.pathToTestObject(testObject1),
        actualImage: tools.pathToTestObject(testObject2),
        diffImage: pathToDiffImage,
        shadow: true
    }, (error, imagesAreSame) => callback(error || null, error ? null : pathToDiffImage));
}

module.exports = diff;