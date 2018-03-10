const gulp = require('gulp');
const sassCompile = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const uglifyJS = require('gulp-uglify');
const babel = require('gulp-babel');
const pump = require('pump');
const concat = require('gulp-concat');


gulp.task('js', (cb) => {

    pump(
        [
            gulp.src('./js/*.js'),
            concat('app.min.js'),
            babel({presets: ['env']}),
            uglifyJS(),
            gulp.dest('./')
        ],
        cb
    );
});

gulp.task('css', (cb) => {
    pump(
        [
            gulp.src('./css/*.scss'),
            concat('style.min.css'),
            sassCompile(),
            minifyCSS(),
            gulp.dest('./')
        ],
        cb
    );
});

gulp.task('watch', () => {
    gulp.watch('./css/*.scss', ['css']);
    gulp.watch('./js/*.js', ['js']);
});

gulp.task('default', ['css', 'js']);
