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

function assets() {
    return gulp.src('./src/assets/**/*')
        .pipe(dest('./dist/assets/'));
}

function css() {
    return gulp
        .src("./src/style/**/*.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(dest("./dist/style/"))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest("./dist/style/"))
        .pipe(browserSync.stream());
}

function js() {
    return (
        gulp
        .src(["./src/js/**/*.js"])
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/preset-env'],
            plugins: []
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

    browserSync.watch('./dist/**/*.*').on('change', browserSync.reload);
}

function watchFiles() {
    gulp.watch("./src/index.html", index);
    gulp.watch("./src/assets/**/*", assets);
    gulp.watch("./src/style/**/*.less", css);
    gulp.watch("./src/js/**/*.js", js);
}

const build = series(clean, parallel(index, assets, css, js));

exports.css = css;
exports.js = js;

exports.clean = clean;
exports.build = build;

exports.default = series(build, parallel(watchFiles, watch));