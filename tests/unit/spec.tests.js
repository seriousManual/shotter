var path = require('path')

var expect = require('chai').expect;

var readSpec = require('../../lib/readSpec')

var mocks = require('../mocks')

describe('readSpec', () => {
    describe('default', () => {
        var spec, error;

        before((done) => {
            var group = mocks.createMockGroup(path.join(__dirname, '../testData/ws1'), 'testGroup1')

            readSpec(group, (_error, _spec) => {
                error = _error
                spec = _spec
                done()
            })
        })

        it('should not return an error', () => expect(error).to.be.null)
        it('should return a spec', () => expect(spec.getUrls()).to.deep.equal(['foo1', 'foo2']))
    })

    describe('brokenSpec', () => {
        var spec, error;

        before((done) => {
            var group = mocks.createMockGroup(path.join(__dirname, '../testData/wsBrokenSpec'), 'testGroup1')

            readSpec(group, (_error, _spec) => {
                error = _error
                spec = _spec
                done()
            })
        })

        it('should return an error', () => expect(error.message).to.equal('SPEC_READ: Unexpected token o'))
        it('should return a spec', () => expect(spec).to.be.undefined)
    })

    describe('noSpec', () => {
        var spec, error;

        before((done) => {
            var group = mocks.createMockGroup(path.join(__dirname, '../testData/wsNoSpec'), 'testGroup1')

            readSpec(group, (_error, _spec) => {
                error = _error
                spec = _spec
                done()
            })
        })

        it('should return an error', () => expect(error.message).to.match(/SPEC_READ: ENOENT: no such file or directory/))
        it('should return a spec', () => expect(spec).to.be.undefined)
    })
})