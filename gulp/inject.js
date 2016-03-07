"use strict";

let path = require('path');
let gulp = require('gulp');
let conf = require('./conf');
let es = require('event-stream');

let $ = require('gulp-load-plugins')();

gulp.task('inject', function () {
    function fileContents(filePath, file) {
        return file.contents.toString();
    }

    let config = {
        shape: {
            dimension: {			// Set maximum dimensions
                maxWidth: 32,
                maxHeight: 32,
                attributes: true
            }
        },
        mode: {
            inline: true,     // Prepare for inline embedding
            symbol: true      // Create a «symbol» sprite
        }
    };

    let svg = gulp.src(conf.paths.src + '/svg/*.svg')
        .pipe($.svgSprite(config));

    let injectVendors = gulp.src([
        path.join(conf.paths.tmp + '/vendors/**/*.js')
    ]);

    let injectStyles = gulp.src([
        path.join(conf.paths.tmp + '/**/*.css')
    ], {read: false});

    let injectScripts = gulp.src([
        path.join(conf.paths.tmp + '/app/**/*.js')
    ]);

    let injectOptions = {
        addRootSlash: false,
        ignorePath: [conf.paths.src, conf.paths.tmp]
    };

    return gulp.src(conf.paths.src + '/index.html')
        .pipe($.inject(es.merge(
            injectScripts.pipe($.angularFilesort()),
            injectVendors.pipe($.angularFilesort()),
            injectStyles
        ), injectOptions))
        .pipe($.inject(svg, {transform: fileContents}))
        .pipe(gulp.dest(conf.paths.tmp))
        .pipe($.size());
});
