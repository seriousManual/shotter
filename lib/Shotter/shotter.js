var webshot = require('webshot');

var tools = require('../tools');

function shoot(testObject, options, callback) {
    options = {
        screenSize: {
            width: 930, height: 2000
        },
        shotSize: {
            width: 930, height: 'all'
        }
    };

    webshot(testObject.getUrl(), tools.pathToTestObject(testObject), options, (error) => {
        callback(error || null);
    });
}

module.exports = shoot;