'use strict';

let gulp = require('gulp');
let path = require('path');
let del = require('del');
let conf = require('./conf');
let $ = require('gulp-load-plugins')();
let runSequence = require('run-sequence');

gulp.task('build', function(done) {
    runSequence(['copy', 'styles', 'scripts:main', 'scripts:vendor', 'scripts', 'templates'],'inject', done);
});

gulp.task('clean', function (done) {
    del([path.join(conf.paths.dist, '/')], done);
});
