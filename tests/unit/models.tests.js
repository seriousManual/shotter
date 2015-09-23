var expect = require('chai').expect;

var Group = require('../../lib/models/Group');
var Session = require('../../lib/models/Session');

var mocks = require('../mocks');

describe('models', () => {
    describe('Group', () => {
        describe('default', () => {
            var group, latestNonNewSession;

            before(() => {
                group = new Group('fooBasePath', 'fooName');

                group.setSpec('fooSpec');
            })

            it('should return the name', () => expect(group.getName()).to.equal('fooName'))
            it('should return isNew', () => expect(group.isNewGroup()).to.be.false)
            it('should return the spec', () => expect(group.getSpec()).to.equal('fooSpec'))
            it('should return the basePath', () => expect(group.getBasePath()).to.equal('fooBasePath'))
        })

        describe('invalid sessions', () => {
            var group, latestNonNewSession;

            before(() => {
                group = new Group('fooBasePath', 'fooName');

                group.addSession(mocks.createMockSession('124', true));
                group.addSession(mocks.createMockSession('125', true));

                latestNonNewSession = group.getLatestNonNewSession();
            })

            it('should not return a session', () => expect(latestNonNewSession).to.be.null);
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

            it('should not return a session', () => expect(latestNonNewSession.getIdentifier()).to.equal('126'));
        })
    })

    describe('Session', () => {
        describe('static methods', () => {
            it('should create an identifier', () => expect(Session.createIdentfier()).to.match(/\d{14}/))
            it('should create a new session', () => {
                var newSession = Session.createNewSession();
                expect(newSession.getIdentifier()).to.match(/\d{14}/)
                expect(newSession.isNewSession()).to.be.true
            })
        })

        describe('default, /w initialization', () => {
            var session

            before(() => {
                session = new Session('12345', true)

                session.setGroup('fooGroup');

                session.addTestObject(mocks.createMockTestObject('fooName'))
                session.addTestObject(mocks.createMockTestObject('barName'))
                session.addTestObject(mocks.createMockTestObject('baxName'))
            })

            it('should return the identifier', () => expect(session.getIdentifier()).to.equal('12345'))
            it('should return isNewSession', () => expect(session.isNewSession()).to.be.true)
            it('should return the grou', () => expect(session.getGroup()).to.equal('fooGroup'))
            it('should return an equivalent testobject', () => {
                var equivalent = session.getEquivalentTestObject(mocks.createMockTestObject('asdf'));
                expect(equivalent).to.be.undefined;
            })
            it('should return an equivalent testobject', () => {
                var equivalent = session.getEquivalentTestObject(mocks.createMockTestObject('fooName'));
                expect(equivalent.getFileName()).to.equal('fooName')
            })
        })

        describe('default, no initialization', () => {
            var session

            before(() => {
                session = new Session()
            })

            it('should return the identifier', () => expect(session.getIdentifier()).to.match(/\d{14}/))
        })
    })
})