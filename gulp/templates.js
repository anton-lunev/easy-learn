


'use strict';

var templateCache = require('gulp-angular-templatecache');
var gulp = require('gulp');
var conf = require('./conf');
var $ = require('gulp-load-plugins')();

gulp.task('templates', function() {
    return gulp.src(conf.paths.src + '/**/*.html')
        .pipe($.angularTemplatecache({module: 'easy-learn'}))
        .pipe(gulp.dest(conf.paths.tmp + '/app'));
});
