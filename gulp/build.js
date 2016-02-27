'use strict';

var gulp = require('gulp');
var path = require('path');
var del = require('del');
var conf = require('./conf');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

gulp.task('build', function(done) {
    runSequence(['copy', 'styles', 'scripts:main', 'scripts:vendor', 'scripts', 'templates'],'inject', done);
});

gulp.task('clean', function (done) {
    del([path.join(conf.paths.dist, '/')], done);
});
