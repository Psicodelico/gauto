const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const del = require("del");

const less = require('gulp-less');
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");

const {
    series,
    parallel
} = gulp;

function clean() {
    return del(["./dist/"]);
}

function images(cb) {
    console.log('css');
    // body omitted
    cb();
}

function css(cb) {
    console.log('css');
    // body omitted
    cb();
}

function js(cb) {
    console.log('js');
    // body omitted
    cb();
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './src/'
        },
        notify: false,
        port: 3000
    });

    browserSync.watch('./src/**/*.*').on('change', browserSync.reload);
}

const build = series(clean, parallel(images, css, js));

exports.images = images;
exports.css = css;
exports.js = js;

exports.clean = clean;
exports.build = build;

exports.watch = watch;
exports.default = watch;