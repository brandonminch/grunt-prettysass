/*
 * grunt-pretty-sass
 * https://github.com/brandonminch/grunt-pretty-sass
 *
 * Copyright (c) 2013 Brandon Minch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    setup: {
      test: {
        files: {
          'tmp1/default.scss': 'test/fixtures/test.scss',
          'tmp2/alphabetize.scss': 'test/fixtures/test.scss'
        }
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp1', 'tmp2'],
    },

    // Configuration to be run (and then tested).
    prettysass: {
      default_options: {
        options: {
          sassDir: 'tmp1'
        }
      },
      alphabetize: {
        options: {
          sassDir: 'tmp2',
          alphabetize: true
        }
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'setup', 'prettysass', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
