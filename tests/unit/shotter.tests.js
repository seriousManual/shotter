var path = require('path')

var expect = require('chai').expect
var sand = require('sandboxed-module')

var shotter = require('../../lib/Shotter/shotter')
var Group = require('../../lib/models/Group')
var Session = require('../../lib/models/Session')
var TestObject = require('../../lib/models/TestObject')

var mocks = require('../mocks')

describe('shotter', () => {
    describe('default', () => {
        var webshotMock, shotter

        before((done) => {
            webshotMock = mocks.createWebshot(null)
            shotter = sand.require('../../lib/Shotter/shotter', {
                requires: {
                    'webshot': webshotMock
                }
            })
            var g = new Group('gBase', 'gName', false)
            var s = new Session('sIdent', false)
            var to = new TestObject('toUrl', 'toFileName', false)

            to.setSession(s)
            s.setGroup(g)

            shotter(to, {}, done)
        })

        it('should call webshot', () => {
            var args = webshotMock.args[0]

            expect(webshotMock.args.length).to.equal(1)
            expect(args[0]).to.equal('toUrl')
            expect(args[1]).to.equal(path.join('gBase', 'gName', 'sIdent', 'toFileName'))
            expect(args[2]).to.deep.equal({
                screenSize: {
                    width: 930, height: 2000
                },
                shotSize: {
                    width: 930, height: 'all'
                }
            })
        })

    })
})