var sinon = require('sinon')

module.exports = {
    createMockGroup: (basePath, name) => {
        return {
            getBasePath: () => basePath,
            getName: () => name
        }
    },

    createMockSession: (ident, isNew) => {
        return {
            isNewSession: () => isNew,
            getIdentifier: () => ident
        }
    },

    createMockTestObject: (fileName) => {
        return {
            getFileName: () => fileName
        }
    },

    createShotter: (error) => {
        return sinon.spy((testObject, options, callback) => {
            process.nextTick(() => callback(error))
        })
    },

    createCompare: (error, pathToDiffImage) => {
        return sinon.spy((testObject1, testObject2, callback) => {
            process.nextTick(() => callback(error, pathToDiffImage))
        })
    },

    createCombine: (error) => {
        return sinon.spy((firstObject, testObject, pathToDiffImage, callback) => {
            process.nextTick(() => callback(error))
        })
    }
}