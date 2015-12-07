var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
 
gulp.task('sass', function () {
  gulp.src('dev/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('default', ['browser-sync']);
 
gulp.task('uglify', function() {
  	gulp.src('dev/js/*.js')
    .pipe(uglify('app.min.js'))
    .pipe(gulp.dest('assets/js'))
});

gulp.task('hint', function() {
  	gulp.src('dev/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("dev/scss/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("dev/js/*.js", ['hint', 'uglify']).on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});