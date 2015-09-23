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
    }
}