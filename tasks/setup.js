/*
 * grunt-prettysass
 * https://github.com/brandonminch/grunt-prettysass
 *
 * Copyright (c) 2013 Brandon Minch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('setup', 'Set up test files', function() {

    var files = this.files;

    files.forEach(function (file) {
      grunt.log.writeln('copying test files: ' + file.src + ' to ' + file.dest);
      grunt.file.copy(file.src, file.dest);
    });

  });

};
