var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var es = require('event-stream');

var $ = require('gulp-load-plugins')();

gulp.task('inject', function () {
    var injectVendors = gulp.src([
        path.join(conf.paths.tmp + '/vendors/**/*.js')
    ]);

    var injectStyles = gulp.src([
        path.join(conf.paths.tmp + '/**/*.css')
    ], {read: false});

    var injectScripts = gulp.src([
        path.join(conf.paths.tmp + '/app/**/*.js')
    ]);

    var injectOptions = {
        addRootSlash: false,
        ignorePath: [conf.paths.src, conf.paths.tmp]
    };

    return gulp.src(conf.paths.src + '/index.html')
        .pipe($.inject(es.merge(
            injectScripts.pipe($.angularFilesort()),
            injectVendors.pipe($.angularFilesort()),
            injectStyles
        ), injectOptions))
        .pipe(gulp.dest(conf.paths.tmp))
        .pipe($.size());
});
