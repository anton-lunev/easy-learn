/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

//var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: 'dist'
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  // exclude: [/jquery/],
  directory: 'bower_components'
};

