var path = require('path')

var expect = require('chai').expect;

var readSpec = require('../../lib/readSpec')

var mocks = require('../mocks')

describe('readSpec', () => {
    var spec, error;

    before((done) => {
        var group = mocks.createMockGroup(path.join(__dirname, '../testData'), 'testGroup1')

        readSpec(group, (_error, _spec) => {
            error = _error
            spec = _spec
            done()
        })
    })

    it('should not return an error', () => expect(error).to.be.null)
    it('should return a spec', () => expect(spec.getUrls()).to.deep.equal(['foo1', 'foo2']))
})