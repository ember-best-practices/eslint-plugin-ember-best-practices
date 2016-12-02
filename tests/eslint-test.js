var lint = require('mocha-eslint');

var paths = [
  'config',
  'lib/**/*.js',
  'tests/**/*.js'
];

lint(paths);
