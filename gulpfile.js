const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject("tsconfig.json");
const source = require('vinyl-source-stream');
const browserify = require('browserify');

gulp.task('build-ts', function () {
    return gulp.src('**/*.ts')
        .pipe(tsProject())
        .js.pipe(gulp.dest("."));
});

gulp.task('tests', ['build-ts'], function () {
    return browserify({
        entries: ['./tests/Program.js'],
        debug: true,
        entry: './tests/Program.js',
        paths: './'
    }).bundle()
        .pipe(source("ichigo-tests.js"))
        .pipe(gulp.dest('./tests_out'));
});

gulp.task('mi5-component', ['build-ts'], function () {
    return browserify({
        entries: ['./build/chibi/Component.js'],
        debug: true,
        entry: './build/chibi/Component.js',
        paths: './'
    }).bundle()
        .pipe(source("mi5-component.js"))
        .pipe(gulp.dest('./dist'));
});

gulp.task('mi5-extension', ['build-ts'], function () {
    return browserify({
        entries: ['./build/chibi/PrototypeExtension.js'],
        debug: true,
        entry: './build/chibi/PrototypeExtension.js',
        paths: './'
    }).bundle()
        .pipe(source("mi5-extension.js"))
        .pipe(gulp.dest('./dist'));
});

gulp.task('mi5-keyword', ['build-ts'], function () {
    return browserify({
        entries: ['./build/chibi/Keyword.js'],
        debug: true,
        entry: './build/chibi/Keyword.js',
        paths: './'
    }).bundle()
        .pipe(source("mi5-keyword.js"))
        .pipe(gulp.dest('./dist'));
});

gulp.task('mi5-observable', ['build-ts'], function () {
    return browserify({
        entries: ['./build/chibi/Observable.js'],
        debug: true,
        entry: './build/chibi/Observable.js',
        paths: './'
    }).bundle()
        .pipe(source("mi5-observable.js"))
        .pipe(gulp.dest('./dist'));
});

gulp.task('mi5-promise', ['build-ts'], function () {
    return browserify({
        entries: ['./build/chibi/Promise.js'],
        debug: true,
        entry: './build/chibi/Promise.js',
        paths: './'
    }).bundle()
        .pipe(source("mi5-promise.js"))
        .pipe(gulp.dest('./dist'));
});

gulp.task('mi5-router', ['build-ts'], function () {
    return browserify({
        entries: ['./build/chibi/Router.js'],
        debug: true,
        entry: './build/chibi/Router.js',
        paths: './'
    }).bundle()
        .pipe(source("mi5-router.js"))
        .pipe(gulp.dest('./dist'));
});

gulp.task('mi5-util', ['build-ts'], function () {
    return browserify({
        entries: ['./build/chibi/Util.js'],
        debug: true,
        entry: './build/chibi/Util.js',
        paths: './'
    }).bundle()
        .pipe(source("mi5-util.js"))
        .pipe(gulp.dest('./dist'));
});

gulp.task('mi5-full', ['build-ts'], function () {
    return browserify({
        entries: ['./build/Full.js'],
        debug: true,
        entry: './build/Full.js',
        paths: './'
    }).bundle()
        .pipe(source("ichigo-full.js"))
        .pipe(gulp.dest('./dist'));
});

gulp.task('mi5-build-all', [
    'mi5-component',
    'mi5-extension',
    'mi5-keyword',
    'mi5-observable',
    'mi5-promise',
    'mi5-router',
    'mi5-util',
    'mi5-full'
]);

// I set this up in keybindings.json (global). VSCode wouldn't let me set it up as a workspace setting.
gulp.task('gulp-default', ['tests']);