'use strict';

let path = require('path');
let gulp = require('gulp');
let conf = require('./conf');

let browserSync = require('browser-sync');
let browserSyncSpa = require('browser-sync-spa');

let util = require('util');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  let routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  let server = {
    baseDir: baseDir,
    routes: routes
  };

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function () {
  browserSyncInit([conf.paths.tmp, conf.paths.src]);
});
