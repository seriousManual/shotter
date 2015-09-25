var expect = require('chai').expect;

var Group = require('../../lib/models/Group')
var Session = require('../../lib/models/Session')
var TestObject = require('../../lib/models/TestObject')
var Spec = require('../../lib/models/Spec')

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

            it('should return two sessions', () => expect(group.getSessions().length).to.equal(2))
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
            it('should return 3 testobjects', () => expect(session.getTestObjects().length).to.equal(3))
        })

        describe('default, no initialization', () => {
            var session

            before(() => session = new Session())

            it('should return the identifier', () => expect(session.getIdentifier()).to.match(/\d{14}/))
        })
    })

    describe('TestObject', () => {
        describe('default', () => {
            var to

            before(() => {
                to = new TestObject('fooUrl', 'fooFileName', true)

                to.setSession('fooSession')
            })

            it('should return the url', () => expect(to.getUrl()).to.equal('fooUrl'))
            it('should return the filename', () => expect(to.getFileName()).to.equal('fooFileName'))
            it('should return isNew', () => expect(to.isNewTestObject()).to.be.true)
            it('should return the session', () => expect(to.getSession()).to.equal('fooSession'))
        })

        describe('unitialized', () => {
            var to

            before(() => {
                to = new TestObject('fooUrl')
            })

            it('should return the url', () => expect(to.getUrl()).to.equal('fooUrl'))
            it('should return isNew', () => expect(to.isNewTestObject()).to.be.false)
            it('should return the fileName', () => expect(to.getFileName()).to.equal('0ecebd6afb4b635c0aaa9405599955f2.png'))
        })
    })

    describe('Spec', () => {
        var spec

        before(() => {
            spec = new Spec({urls: ['foo', 'bar']})
        })

        it('should return the urls', () => expect(spec.getUrls()).to.deep.equal(['foo', 'bar']))
    })
})