'use strict';

let gulp = require('gulp');
let conf = require('./conf');
let $ = require('gulp-load-plugins')();

gulp.task('templates', function() {
    return gulp.src(conf.paths.src + '/**/*.html')
        .pipe($.angularTemplatecache({module: 'easy-learn'}))
        .pipe(gulp.dest(conf.paths.tmp + '/app'));
});
