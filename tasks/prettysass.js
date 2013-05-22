/*
 * grunt-prettysass
 * https://github.com/brandonminch/grunt-prettysass
 *
 * Copyright (c) 2013 Brandon Minch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var fs = require('fs'),
    exec = require('child_process').exec,
    filesLength = 0,
    filesComplete = 0;

  grunt.registerMultiTask('prettysass', 'Your task description goes here.', function() {

    var options = this.options({});
    var files = grunt.file.expand(options.sass);
    var done = this.async();

    // Iterate over all specified file groups.
    files.forEach(function(file, i) {

      var dirtySass = file.read,
          command = 'sass-convert --from scss --to scss --indent t --in-place ' + file;

      grunt.log.writeln('prettifying: '.cyan + file);

      exec(command, function ( error, stdout, stderr ) {
        if ( error !== null ) {
          grunt.log.error( file + ': ' + error );
          done( false );
        } else {
          if (options.alphabetize) {
            //alphabetize(filepath);
          }
        }
      });

    });
  });

};
