var fs = require('fs')

var tools = require('./tools')

var Spec = require('./models/Spec')

function readSpec (group, callback) {
    fs.readFile(tools.pathToSpec(group), {encoding: 'utf8'}, (error, data) => {
        if (error) return callback(error)

        try {
            callback(null, new Spec(JSON.parse(data)))
        } catch(error) {
            callback(error)
        }
    })
}

module.exports = readSpec