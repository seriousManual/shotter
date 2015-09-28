var path = require('path')

var expect = require('chai').expect;

var SessionHandler = require('../../lib/SessionHandler')

var basePath = path.join(__dirname, '../testData/ws1');

describe('SessionHandler', () => {
    var handler, groups, group, sessions, session, tos, to

    before((done) => {
        handler = new SessionHandler(basePath)
        handler.readGroup((error, _groups) => {
            expect(error).to.be.null
            groups = _groups
            group = groups[0]
            sessions = groups[0].getSessions()
            session = sessions[0]
            tos = session.getTestObjects()
            to = tos[0]
            done()
        })
    })

    it('should return one group', () => expect(groups.length).to.equal(1))
    it('should return one session', () => expect(sessions.length).to.equal(1))
    it('should return one testObject', () => expect(session.getTestObjects().length).to.equal(1))

    it('should wire group with session', () => {
        expect(session.getGroup()).to.equal(group)
        expect(group.getSessions()).to.contain(session)
    })
    it('should wire testobject with session', () => {
        expect(to.getSession()).to.equal(session)
        expect(session.getTestObjects()).to.contain(to)
    })

    it('should set the correct values in Group', () => {
        expect(group.getName()).to.equal('testGroup1')
        expect(group.getSpec().getUrls()).to.deep.equal(['foo1', 'foo2'])
        expect(group.getBasePath()).to.equal(basePath)
    })
    it('should set the correct values in Session', () => {
        expect(session.getIdentifier()).to.equal('123')
        expect(session.isNewSession()).to.be.false
    })
    it('should set the correct values in TO', () => {
        expect(to.getUrl()).to.be.null
        expect(to.getFileName()).to.equal('BirthdayCatParty.jpg')
        expect(to.isNewTestObject()).to.be.false
    })
})