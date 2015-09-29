var fs = require('fs')

var tools = require('./tools')

var Spec = require('./models/Spec')

function readSpec (group, callback) {
    fs.readFile(tools.pathToSpec(group), {encoding: 'utf8'}, (error, data) => {
        if (error) return callback(_createSpecError(error))

        try {
            callback(null, new Spec(JSON.parse(data)))
        } catch(error) {
            callback(_createSpecError(error))
        }
    })
}

function _createSpecError(error) {
    return new Error('SPEC_READ: '  + error.message)
}

module.exports = readSpec;
