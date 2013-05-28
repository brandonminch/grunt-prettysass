'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.prettysass = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default.scss');
    var expected = grunt.file.read('test/expected/default.scss');
    test.equal(actual, expected, 'default sass formatting');

    test.done();
  },
  alphabetize: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/alphabetize.scss');
    var expected = grunt.file.read('test/expected/alphabetize.scss');
    test.equal(actual, expected, 'alphabetized sass formating');

    test.done();
  }
};
