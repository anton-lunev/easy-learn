'use strict';

let gulp = require('gulp');

require('require-dir')('./gulp');

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default'/*, ['clean']*/, function () {
  gulp.start('build');
});
