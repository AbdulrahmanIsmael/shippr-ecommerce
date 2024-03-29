const gulp = require('gulp');
const pug = require('gulp-pug');
const autoPrefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const livereload = require('gulp-livereload');

gulp.task('pug', () => {
  gulp
    .src('./project/pug/*.pug')
    .pipe(pug({ pretty: false }))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('sass', () => {
  gulp
    .src('./project/sass/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoPrefixer('last 2 versions'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
});

gulp.task('js', () => {
  gulp.src('./project/js/*.*').pipe(gulp.dest('./dist/js')).pipe(livereload());
});

gulp.task('images', () => {
  gulp
    .src('./project/images/*.*')
    .pipe(gulp.dest('./dist/images'))
    .pipe(livereload());
});

gulp.task('assests', () => {
  gulp
    .src('./project/assests/*.*')
    .pipe(gulp.dest('./dist/assests'))
    .pipe(livereload());
});

gulp.task('each', gulp.parallel('pug', 'sass', 'js', 'images', 'assests'));
