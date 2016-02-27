'use strict';

let path = require('path');
let gulp = require('gulp');
let conf = require('./conf');
let $ = require('gulp-load-plugins')();
let mainBowerFiles = require('main-bower-files');

gulp.task('scripts', function () {
    return gulp.src([
        path.join(conf.paths.src, '/app/**/*.js')
    ]).pipe($.angularFilesort())
        // .pipe($.jshint())
        // .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.concat('app.js'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(conf.paths.tmp + '/app'))
        .pipe($.size());
});

gulp.task('scripts:main', function () {
    return gulp.src([
            path.join(conf.paths.src, '/main.js'),
            path.join(conf.paths.src, '/package.json')
        ])
        .pipe(gulp.dest(conf.paths.tmp))
});

gulp.task('scripts:vendor', function () {
    let vendors = mainBowerFiles();
    console.log(vendors);
    return gulp.src(vendors)
        .pipe($.filter(['*.js', '!*knockout-sortable.js', '!*react-sortable-mixin.js']))
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest(conf.paths.tmp + '/vendors'));
});
