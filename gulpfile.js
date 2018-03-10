const gulp = require('gulp');
const sassCompile = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const uglifyJS = require('gulp-uglify');
const babel = require('gulp-babel');
const pump = require('pump');

gulp.task('js', (cb) => {
    pump(
        [
            gulp.src('./js/*.js'),
            babel({presets: ['env']}),
            gulp.dest('./app.js')
        ],
        cb
    );
});

gulp.task('css', () => {
    return gulp.src('./css/*.scss')
        .pipe(sassCompile())
        //.pipe(minifyCSS())
        .pipe(gulp.dest('./style.css'));
});

gulp.task('default', ['css', 'js']);
