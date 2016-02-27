'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function() {
    return gulp.src(conf.paths.src + '/**/*.less')
        .pipe($.sourcemaps.init())
        .pipe($.less())
        .pipe($.concat('app.css'))
        .pipe($.sourcemaps.write())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //.pipe($.csso())
        .pipe(gulp.dest(conf.paths.tmp + '/app'));
});
