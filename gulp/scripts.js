'use strict';

let path = require('path');
let gulp = require('gulp');
let conf = require('./conf');
let $ = require('gulp-load-plugins')();
let mainBowerFiles = require('main-bower-files');

gulp.task('scripts', function () {
    return gulp.src([
        path.join(conf.paths.src, '/app/**/*.js')
    ])
        // .pipe($.jshint())
        // .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.angularFilesort())
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
    // let vendors = mainBowerFiles();
    let vendors = [
        'bower_components/angular/angular.js',
        'bower_components/angular-local-storage/dist/angular-local-storage.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/lokijs/src/lokijs.js',
        'bower_components/lokijs/src/loki-indexed-adapter.js',
        'bower_components/lokijs/src/loki-angular.js'
    ];

    console.log(vendors);
    return gulp.src(vendors)
        // .pipe($.filter(['*.js', '!*knockout-sortable.js', '!*react-sortable-mixin.js']))
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest(conf.paths.tmp + '/vendors'));
});
