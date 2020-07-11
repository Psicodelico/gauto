const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const del = require("del");

const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const less = require('gulp-less');
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");

/* const webpack = require("webpack");
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream"); */

const babel = require('gulp-babel');

const {
    series,
    parallel,
    dest
} = gulp;

function clean() {
    return del(["./dist/"]);
}

function index() {
    return gulp.src('./src/index.html')
        .pipe(dest('./dist/'));
}

function css() {
    return gulp
        .src("./src/**/*.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(dest("./dist/css/"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest("./dist/css/"))
        .pipe(browserSync.stream());
}

function js() {
    return (
        gulp
        .src(["./src/**/*.js"])
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        // .pipe(webpackstream(webpackconfig, webpack))
        // folder only, filename is specified in webpack config
        .pipe(gulp.dest("./dist/js/"))
        .pipe(browserSync.stream())
    );
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        },
        notify: false,
        port: 3000
    });

    browserSync.watch('./src/**/*.*').on('change', browserSync.reload);
}

const build = series(clean, parallel(index, css, js));

exports.css = css;
exports.js = js;

exports.clean = clean;
exports.build = build;

exports.watch = watch;
exports.default = watch;