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

gulp.task('bundle', ['build-ts'], function () {
    // This will happen even if there is a TSC error, and it'll spit out a ton of garbage.
    // That's built into gulp.
    return browserify({
        entries: ['./src/Program.js'],
        debug: true,
        entry: './src/Program.js',
    }).bundle()
        .pipe(source("ichigo.js"))
        .pipe(gulp.dest('./out'));
});

gulp.task('default', ['bundle'], function () {
    console.log('DONE BUILDING');
});