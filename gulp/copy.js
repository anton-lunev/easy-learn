var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

gulp.task('copy', function () {
    return gulp.src([
            path.join(conf.paths.src, '/fonts/*'),
            path.join(conf.paths.src, '/images/*')
        ], {
            'base': conf.paths.src
        })
        .pipe(gulp.dest(conf.paths.tmp));
});
