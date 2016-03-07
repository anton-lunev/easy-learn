'use strict';

let gulp = require('gulp');
let conf = require('./conf');
let $ = require('gulp-load-plugins')();

gulp.task('styles', function() {
    return gulp.src(conf.paths.src + '/**/*.less')
        .pipe($.sourcemaps.init())
        .pipe($.less())
        .pipe($.concat('app.css'))
        .pipe($.sourcemaps.write())
        .pipe($.autoprefixer({
            browsers: ['last 2 Chrome versions'],
            cascade: false
        }))
        .pipe(gulp.dest(conf.paths.tmp + '/app'));
});
