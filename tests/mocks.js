module.exports = {
    createMockSession: (ident, isNew) => {
        return {
            isNewSession: () => isNew,
            getIdentifier: () => ident
        };
    }
};