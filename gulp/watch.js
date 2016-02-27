'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

gulp.task('watch', ['build'], function () {
    gulp.watch(conf.paths.src + '/app/**/*.js', ['scripts']);

    gulp.watch(conf.paths.src + '/app/**/*.html', ['templates']);

    gulp.watch([
        path.join(conf.paths.src, '/app/**/*.css'),
        path.join(conf.paths.src, '/app/**/*.less')
    ], ['styles']);

    gulp.watch([
        path.join(conf.paths.tmp, '/app/*.*'),
        path.join(conf.paths.src, '/*.html'),
        'bower.json'
    ], ['inject']);

    // gulp.watch(path.join(conf.paths.tmp, '/**/*.html'), function (event) {
    //     browserSync.reload(event.path);
    // });
});
