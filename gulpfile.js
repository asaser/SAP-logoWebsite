// deklarowanie zmiennych
const gulp = require('gulp');

// js
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

// css
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const {src, series, parallel, dest, watch} = require('gulp');

const jsPath = 'app/assets/js/**/*.js';
const cssPath = 'app/assets/css/**/*.css';


function copyHTML() {
  return src('app/*.html').pipe(gulp.dest('dist'));
}

// minify obrazkow
function imgTask() {
  return src('app/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
}

// zmiejszenie rozmiarow JS i laczenie ich
function jsTask() {
  return src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    // minify JS
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/js'));
}

// zmniejszenie rozmiarow CSS i laczenie ich
function cssTask() {
  return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    // minify CSS
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/css'));
}

// Automatyczne przeładowanie przeglądarki
function watchTask() {
  watch([cssPath, jsPath], {
    interval: 1000
  },
  parallel(cssTask, jsTask));
}


exports.cssTask = cssTask;
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.copyHTML = copyHTML;
exports.default = series(parallel(copyHTML, imgTask, jsTask, cssTask), watchTask);
