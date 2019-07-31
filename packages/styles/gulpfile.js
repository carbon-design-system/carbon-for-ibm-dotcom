const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('clean', () => {
  return del(['dist/**/*']);
});

gulp.task('sass:dev', done => {
  gulp
    .src('src/watson-demos.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('watson-demos.css'))
    .pipe(gulp.dest('dist'))
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(rename('watson-demos.min.css'))
    .pipe(gulp.dest('dist'));

  done();
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.scss', gulp.task('sass:dev'));
});

gulp.task('default', gulp.series('clean', 'sass:dev', 'watch'));
