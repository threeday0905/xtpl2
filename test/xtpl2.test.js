'use strict';

var expect = require('chai').expect;

describe('xtpl2.js', function() {
    /*jshint -W024, -W030 */

    var xtpl2 = require('../');

    it('will export all methods from xtpl', function() {
        var xtpl = require('xtpl');

        Object.keys(xtpl).forEach(function(key) {
            expect(xtpl[key]).to.equal(xtpl2[key]);
        });
    });

    it('will add koaRender() method for kao', function() {
        var renderMethod = xtpl2.koaRender();
        expect(renderMethod.constructor.name).to.equal('GeneratorFunction');
    });
});
