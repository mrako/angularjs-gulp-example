var gulp = require('gulp');

var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var react = require('gulp-react');
var jshint = require('gulp-jshint');

gulp.task('usemin', function() {
  return gulp.src('./index.html')
    .pipe(usemin({
      css: [ rev() ],
      html: [ minifyHtml({ empty: true }) ],
      vendor: [ rev() ],
      app: [ rev() ]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('jshint', function() {
  var stream = gulp.src(['js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

  if (process.env.CI) {
    stream = stream.pipe(jshint.reporter('fail'));
  }

  return stream;
});

gulp.task('default', ['jshint', 'usemin']);
