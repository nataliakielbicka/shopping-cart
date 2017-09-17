var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('gulp-babel');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({
            outputStyle: 'compressed' //minifikacja pliku css
        }))
        .pipe(rename({
            suffix: '.min' //zmiana nazwy pliku css
        }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream());
});

gulp.task('babel', function() {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

//Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['babel']);
    gulp.watch("./index.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve', 'babel']);