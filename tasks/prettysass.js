/*
 * grunt-prettysass
 * https://github.com/brandonminch/grunt-prettysass
 *
 * Copyright (c) 2013 Brandon Minch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var _ = grunt.util._,
    fs = require('fs'),
    exec = require('child_process').exec,
    filesLength = 0,
    filesComplete = 0;

    function alphabetize(file, done) {
      grunt.log.writeln('alphabetizing: '.yellow + file);
      fs.readFile(file, function(err, data) {
        if (err) {
          throw err;
        }

        var lines = data.toString().split("\n"),
          output = [],
          outputIndex = 0,
          isSelector = false,
          nestDepth = 0,
          selectorIndex = 0,
          selectors = [],
          selectorsMap = [],
          outputString = '',
          combination = '',
          flattened;

        lines.forEach(function (line) {
          var selectorStart = /\{/g.test(line),
            selectorEnd = /\}/g.test(line),
            combined = /,$/.test(line);

          if (combined) {
            combination += line + '\n';
          } else if (selectorStart) {
            if (!isSelector) {
              isSelector = true;
            } else {
              nestDepth++;
            }

            if (combination) {
              line = combination + line;
              combination = '';
            }

            selectorIndex = selectors.length;
            selectors[selectorIndex] = [];
            selectorsMap.push(selectorIndex);

            output[outputIndex] = line;
            outputIndex++;
            output[outputIndex] = selectors[selectorIndex];
            outputIndex++;
          } else if (selectorEnd) {
            if (nestDepth > 0) {
              nestDepth--;
            } else {
              isSelector = false;
            }
            selectorsMap.pop();
            output[outputIndex] = line;
            outputIndex++;
          } else if (isSelector) {
            selectors[_.last(selectorsMap)].push(line);
          } else {
            output[outputIndex] = line;
            outputIndex++;
          }

        });
        _.each(selectors, function(selector) {
          if (_.isArray(selector)) {
            selectors[selector] = _.sortBy(selector, function (line) {
              return line;
            });
            selector.sort();
          }
        });

        flattened = _.flatten(output);

        _.each(flattened, function (section) {
          outputString += section + '\n';
        });

        fs.writeFile(file, outputString, 'utf8', function() {
          if (filesComplete ===  filesLength - 1) {
            done( true );
          } else {
            filesComplete++;
          }
        });

      });
  }

  grunt.registerMultiTask('prettysass', 'Your task description goes here.', function() {

    var options = this.options({
      'indent': '2'
    });
    var files = grunt.file.expand(options.sass);
    var done = this.async();

    // Iterate over all specified file groups.
    files.forEach(function(file, i) {

      var dirtySass = file.read,
          command = 'sass-convert --from scss --to scss' + 
                    ' --indent ' + options.indent + 
                    ' --in-place ' + file;

      grunt.log.writeln('prettifying: '.cyan + file);

      exec(command, function ( error, stdout, stderr ) {
        if ( error !== null ) {
          grunt.log.error( file + ': ' + error );
          done( false );
        } else {
          if (options.alphabetize) {
            alphabetize(file, done);
          }
        }
      });

    });

  });

};
