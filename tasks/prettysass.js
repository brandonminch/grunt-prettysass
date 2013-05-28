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
      grunt.log.writeln('alphabetizing: '.green + file);
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
          commentedLine = '',
          isMultiLineComment = false,
          flattened;

        lines.forEach(function (line) {
          var selectorStart = /\{/g.test(line),
            selectorEnd = /\}/g.test(line),
            combined = /,$/.test(line),
            comment = /^\s*(\/)/.test(line);

          if (combined) {
            combination += line + '\n';
          } else if (comment || isMultiLineComment) {
            commentedLine += line + '\n';
            if (/\/\*/.test(line) && !/\*\//.test(line)) {
              isMultiLineComment = true;
            } else if (/\*\//.test(line)) {
              isMultiLineComment = false;
            }
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

            if (commentedLine) {
               line = commentedLine + line;
               commentedLine = '';
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
            if (commentedLine) {
               line = commentedLine + line;
               commentedLine = '';
            }
            selectorsMap.pop();
            output[outputIndex] = line;
            outputIndex++;
          } else if (isSelector) {
            if (commentedLine) {
               line = commentedLine + line;
               commentedLine = '';
            }
            selectors[_.last(selectorsMap)].push(line);
          } else {
            if (commentedLine) {
               line = commentedLine + line;
               commentedLine = '';
            }
            output[outputIndex] = line;
            outputIndex++;
          }

        });
        _.each(output, function(selector, i) {
          if (_.isArray(selector)) {
            output[i] = _.sortBy(selector, function (line) {
              // If commented line, find property to sort by.
              if (/^\s*(\/)/.test(line)) {
                var property = line.match(/^(?!\s*(\/)).*/gm);
                if (property.length) {
                  return property[0];
                } else {
                  return line;
                }
              } else {
                return line;
              }
            });
          }
        });

        flattened = _.flatten(output);

        _.each(flattened, function (section) {
          outputString += section + '\n';
        });

        outputString = _.trim(outputString);

        fs.writeFile(file, outputString, 'utf8', function() {
          if (filesComplete ===  filesLength - 1) {
            done( true );
          } else {
            filesComplete++;
          }
        });

      });
  }

  grunt.registerMultiTask('prettysass', 'Prettify your SASS source files.', function() {

    var options = this.options({
      'alphabetize': false,
      'indent': '2'
    });
    var files = this.filesSrc;
    var done = this.async();

    if (!files.length) {
      grunt.warn('No scss files were found in directory');
    } else {
      filesLength = files.length;
    }

    // Iterate over all specified file groups.
    files.forEach(function(file, i) {

      var command = 'sass-convert --from scss --to scss' + 
                    ' --indent ' + options.indent + 
                    ' --in-place ' + file;

      grunt.log.writeln('prettifying: '.cyan + file);

      exec(command, function ( error, stdout, stderr ) {
        if ( error !== null ) {
          grunt.log.error( file + ': ' + error );
          done( false );
        } else {
          if (options.alphabetize) {
            alphabetize(file.toString(), done);
          } else {
            if (filesComplete ===  filesLength - 1) {
              done( true );
            } else {
              filesComplete++;
            }
          }
        }
      });

    });

  });

};
