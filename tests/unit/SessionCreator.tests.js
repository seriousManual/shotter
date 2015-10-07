var path = require('path')

var expect = require('chai').expect
var sand = require('sandboxed-module')
var sinon = require('sinon')

var mocks = require('../mocks')

var Group = require('../../lib/models/Group')
var Spec = require('../../lib/models/Spec')
var Session = require('../../lib/models/Session')
var TestObject = require('../../lib/models/TestObject')

describe('SessionCreator', () => {
    describe('default', () => {
        var shotter, compare, combine, sc, progress

        before((done) => {
            shotter = mocks.createShotter(null)
            compare = mocks.createCompare(null, 'fooDiffImagePath')
            combine = mocks.createCombine(null)
            progress = sinon.spy()

            var SessionCreator = sand.require('../../lib/SessionCreator', {
                requires: {
                    './Shotter/shotter': shotter,
                    './Shotter/compare': compare,
                    './Shotter/combine': combine
                }
            })

            sc = new SessionCreator()
            sc.on('progress', progress)

            var g1 = new Group('g1Path', 'g1Name')
            var s1 = new Spec({urls: ['g1Url1']})
            var g1s1 = new Session('g1s1')
            var g1s2 = new Session('g1s2')

            var g1s1to1 = new TestObject('g1Url1', 'dc3c2c05e0d8b9b5c59383c1f684c7dd.png')
            var g1s2to1 = new TestObject('g1Url1', 'dc3c2c05e0d8b9b5c59383c1f684c7dd.png')

            g1.addSession(g1s1)
            g1.addSession(g1s2)
            g1.setSpec(s1)

            g1s1.setGroup(g1)
            g1s2.setGroup(g1)

            g1s1to1.setSession(g1s1)
            g1s1.addTestObject(g1s1to1)

            g1s2to1.setSession(g1s2)
            g1s2.addTestObject(g1s2to1)

            var groups = [g1]
            sc.setGroups(groups)
            sc.createSessionForGroups(done)
        })

        it('should call the shotter', () => {
            expect(shotter.args[0][0].getUrl()).to.equal('g1Url1')
            expect(shotter.args[0][0].isNewTestObject()).to.be.true
        })

        it('should call compare', () => {
            expect(compare.args[0][0].getFileName()).to.equal('dc3c2c05e0d8b9b5c59383c1f684c7dd.png')
            expect(compare.args[0][1].getFileName()).to.equal('dc3c2c05e0d8b9b5c59383c1f684c7dd.png')

            expect(compare.args[0][0].isNewTestObject()).to.be.false
            expect(compare.args[0][1].isNewTestObject()).to.be.true
        })

        it('should call combine', () => {
            expect(combine.args[0][0].getFileName()).to.equal('dc3c2c05e0d8b9b5c59383c1f684c7dd.png')
            expect(combine.args[0][1].getFileName()).to.equal('dc3c2c05e0d8b9b5c59383c1f684c7dd.png')

            expect(combine.args[0][0].isNewTestObject()).to.be.false
            expect(combine.args[0][1].isNewTestObject()).to.be.true

            expect(combine.args[0][2]).to.equal('fooDiffImagePath')
        })

        it('should emit progress', () => {
            expect(progress.args.length).to.equal(3)
        })
    })
})