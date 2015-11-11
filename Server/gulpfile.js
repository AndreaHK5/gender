(function () {
  'use strict';

  var gulp = require('gulp');
  var nodemon = require('gulp-nodemon');
  // type gulp to start
  gulp.task('default', ['serve']);

  gulp.task('serve', function() {
    nodemon({
      script: 'server.js'
    , ext: 'js'
    , env: { 'NODE_ENV': 'development' }
    })
  });

})();