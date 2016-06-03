/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var typescript = require('gulp-typescript');
var tscConfig = require('./scripts/tsconfig.json');
var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

var destPath = './wwwroot/libs/';
var destComponentsPath = './wwwroot/appScripts';
var baseComponentsPath = { base: 'scripts' };

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(destPath)
        .pipe(clean());
});

gulp.task("scriptsNStyles", () => {
    gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'angular2-jwt/angular2-jwt.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'jquery/dist/jquery.*js',
            'bootstrap/dist/js/bootstrap.*js',
    ], {
        cwd: "node_modules/**"
    })
        .pipe(gulp.dest("./wwwroot/libs"));

    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css'
    ]).pipe(gulp.dest('./wwwroot/libs/css'));
});

gulp.task('ts', function () {
    return gulp
        .src('scripts/**/*.ts', baseComponentsPath)
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(gulp.dest(destComponentsPath));
});

gulp.task('html', function () {
    return gulp
        .src('scripts/**/*.html', baseComponentsPath)
        .pipe(gulp.dest(destComponentsPath));
});

gulp.task('scss', function () {
    return gulp.src('scripts/**/*.scss', baseComponentsPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(destComponentsPath));
});

gulp.task('default', ['ts', 'html', 'scss', 'watch']);

gulp.task('watch', function (cb) {
    gulp.watch('scripts/**/*.ts', ['ts']);
    gulp.watch('scripts/**/*.html', ['html']);
    gulp.watch('scripts/**/*.scss', ['scss']);
});

//var tsProject = ts.createProject('scripts/tsconfig.json');
//gulp.task('ts', function (done) {
//    //var tsResult = tsProject.src()
//    var tsResult = gulp.src([
//            "scripts/*.ts", 'scripts/**/*'
//    ],{ base: 'scripts' })
//        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
//    return tsResult.js.pipe(gulp.dest('./wwwroot/appScripts'));
//});



//gulp.task('watch', ['watch.ts']);

//gulp.task('watch.ts', ['ts'], function () {
//    return gulp.watch('scripts/*.ts', ['ts']);
//});

//gulp.task('copyComponents', function () {
//    var dest = './wwwroot/appScripts';
//    var base = { base: 'scripts' };

//    gulp.src('scripts/**/*.html', base)
//        .pipe(gulp.dest(dest));

//    gulp.src('scripts/**/*.scss', base)
//        .pipe(sass().on('error', sass.logError))
//        .pipe(cleanCSS({ compatibility: 'ie8' }))
//        .pipe(gulp.dest(dest));

//    return gulp.src(['scripts/**/*', 'scripts/*.ts'], base)
//        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter())
//        .pipe(gulp.dest(dest));
//});

//gulp.task('default', ['scriptsNStyles', 'watch']);
//gulp.task('default', ['scriptsNStyles']);