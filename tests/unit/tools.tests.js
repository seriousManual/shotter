var path = require('path')
var util = require('util')

var sinon = require('sinon')
var expect = require('chai').expect

var Group = require('../../lib/models/Group')
var Session = require('../../lib/models/Session')
var Testobject = require('../../lib/models/TestObject')
var tools = require('../../lib/tools')

describe('readSpec', () => {
    var group, session, testObject

    before(() => {
        group = new Group('fooBase', 'fooGroup')
        session = new Session('fooSession')
        testObject = new Testobject('fooUrl', 'fooTestObject')

        session.setGroup(group)
        testObject.setSession(session)
    })

    it('should return the url to a group',
        () => expect(tools.pathToGroup(group)).to.equal(util.format('fooBase%sfooGroup', path.sep)))
    it('should return the url to a group spec',
        () => expect(tools.pathToSpec(group)).to.equal(util.format('fooBase%sfooGroup%s.spec.json', path.sep, path.sep)))

    it('should return the url to a session',
        () => expect(tools.pathToSession(session)).to.equal(util.format('fooBase%sfooGroup%sfooSession', path.sep, path.sep)))
    it('should return the url to a session result',
        () => expect(tools.pathToSessionResult(session)).to.equal(util.format('fooBase%sfooGroup%sfooSession%sresults', path.sep, path.sep, path.sep)))

    it('should return the url to a testobject',
        () => expect(tools.pathToTestObject(testObject)).to.equal(util.format('fooBase%sfooGroup%sfooSession%sfooTestObject', path.sep, path.sep, path.sep)))
    it('should return the url to a testobject diff',
        () => expect(tools.pathToTestObjectDiff(testObject)).to.equal(util.format('fooBase%sfooGroup%sfooSession%sdiffs%sfooTestObject', path.sep, path.sep, path.sep, path.sep)))
    it('should return the url to a testobject result',
        () => expect(tools.pathToTestObjectResult(testObject)).to.equal(util.format('fooBase%sfooGroup%sfooSession%sresults%sfooTestObject', path.sep, path.sep, path.sep, path.sep)))

    it('should pad (<10)', () => expect(tools.pad(1)).to.equal('01'))
    it('should pad (>=10)', () => expect(tools.pad(11)).to.equal('11'))

    describe('timeKey', () => {
        var clock

        before(() => clock = sinon.useFakeTimers((new Date(2010, 0, 10, 3, 4, 47)).getTime()))
        after(() => clock.restore())

        it('should create a timekey', () => expect(tools.timeKey()).to.equal('20100110030447'))
    })
})