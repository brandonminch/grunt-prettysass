# grunt-prettysass

> Prettify and alphabetize your SASS source files.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-prettysass --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-prettysass');
```

## The "prettysass" task

### Overview
In your project's Gruntfile, add a section named `prettysass` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  prettysass: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.alphabetize
Type: `Boolean`
Default value: `false`

Sort SASS properties alphabetically.

#### options.indent
Type: `mixed`
Default value: `2`

How many spaces to use for each level of indentation. Defaults to 2. "t" means use hard tabs.

### Usage Examples

To run prettysass and alphabetize properties on all files in your scss directory. You can define source files individually in an array or use a globbing pattern as shown below:

```js
grunt.initConfig({
  prettysass: {
    options: {
      alphabetize: true
    },
    app: {
      src: ['scss/**/*.scss']
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
