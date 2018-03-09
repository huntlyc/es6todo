const gulp = require('gulp');
const cssScss = require('gulp-css-scss');
const minifyCSS = require('gulp-csso');
const uglifyJS = require('gulp-uglify');
const babel = require('gulp-babel');
const pump = require('pump');

gulp.task('js', (cb) => {
    pump(
        [
            gulp.src('js/*.js'),
            babel({presets: ['env']}),
            gulp.dest('app.js')
        ],
        cb
    );
});

gulp.task('css', () => {
    return gulp.src('css/style.scss')
        .pipe(cssScss())
        //.pipe(minifyCSS())
        .pipe(gulp.dest('style.css'));
});

gulp.task('default', ['css', 'js']);
