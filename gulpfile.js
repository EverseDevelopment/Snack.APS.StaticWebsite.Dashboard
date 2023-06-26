const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');


function cssMinify() {
  return gulp.src('./public/css/*.css')
      .pipe(cssmin())
      .pipe(concat('styles.min.css'))
      .pipe(gulp.dest('./public/css'))
}

function jsMinify() {
  return gulp.src(['./public/js/Charts/*.js', './public/js/*.js'])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/js/min'));
}




exports.cssMinify = cssMinify
exports.jsMinify = jsMinify