var expect = require('chai').expect;

var Group = require('../../lib/models/Group');

var mocks = require('../mocks');

describe('models', () => {
    describe('Group', () => {
        describe('default', () => {
            var group, latestNonNewSession;

            before(() => {
                group = new Group('fooBasePath', 'fooName');

                group.setSpec('fooSpec');
            })

            it ('should return the name', () => expect(group.getName()).to.equal('fooName'))
            it ('should return isNew', () => expect(group.isNewGroup()).to.be.false)
            it ('should return the spec', () => expect(group.getSpec()).to.equal('fooSpec'))
            it ('should return the basePath', () => expect(group.getBasePath()).to.equal('fooBasePath'))
        })

        describe('invalid sessions', () => {
            var group, latestNonNewSession;

            before(() => {
                group = new Group('fooBasePath', 'fooName');

                group.addSession(mocks.createMockSession('124', true));
                group.addSession(mocks.createMockSession('125', true));

                latestNonNewSession = group.getLatestNonNewSession();
            })

            it ('should not return a session', () => expect(latestNonNewSession).to.be.null);
        })

        describe('invalid sessions', () => {
            var group, latestNonNewSession;

            before(() => {
                group = new Group('fooBasePath', 'fooName');

                group.addSession(mocks.createMockSession('126', false));
                group.addSession(mocks.createMockSession('124', false));
                group.addSession(mocks.createMockSession('130', true));

                latestNonNewSession = group.getLatestNonNewSession();
            })

            it ('should not return a session', () => expect(latestNonNewSession.getIdentifier()).to.equal('126'));
        })
    })
})