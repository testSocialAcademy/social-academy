const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

gulp.task('js combine', () => {
    return gulp.src('pages/**/js/scripts/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename("scripts.js"))
        .pipe(gulp.dest('js/'));
});

gulp.task('css combine', () => {
    return gulp.src('pages/**/css/*.css')
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('css/'));
});

gulp.task('build',['css combine', 'js combine']);

gulp.task('watch', () => {
    gulp.watch('./pages/**/js/scripts/*.js', ['js combine']);
    gulp.watch('./pages/**/css/*.css', ['css combine']);
});