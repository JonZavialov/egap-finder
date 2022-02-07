const minify = require('@node-minify/core');
const gcc = require('@node-minify/google-closure-compiler');
const uglifyjs = require('@node-minify/uglify-js');

// Using Google Closure Compiler
minify({
  compressor: gcc,
  input: 'index.js',
  output: 'uglyJS.js',
  callback: function(err, min) {}
});