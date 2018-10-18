/* gulpfile.js */
var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    comb = require('gulp-csscomb'),
    beautify = require('gulp-cssbeautify'),
    autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css');
	rename = require('gulp-rename');

// source and distribution folder
var
    source = 'src/',
    dest = 'dist/';

// Bootstrap scss source
var bootstrapSass = {
        in: './node_modules/bootstrap-sass/'
    };

// fonts
var fonts = {
        in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
        out: dest + 'fonts/'
    };

// css source file: .scss files
var scss = {
    in: source + 'scss/*.scss',
    out: dest + 'css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};


// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
    return gulp
        .src('src/scss/polices/**/*')
        .pipe(gulp.dest('dist/css/polices'));
});

// compile scss
gulp.task('sass', ['fonts'], function () {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(comb())
        .pipe(beautify({indent: '  '}))
        .pipe(gulp.dest(scss.out));
});

// watch sass
gulp.task('watch', ['sass'], function () {
	gulp.watch(scss.watch, ['sass']);
})

// minify css
gulp.task('minify', function() {
  return gulp.src('dist/css/*..min.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'));
});

// default task
gulp.task('default', ['watch', 'minify']);

