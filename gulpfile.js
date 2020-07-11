const {
    watch,
    series
} = require('gulp');
var browserSync = require('browser-sync').create();

function clean(cb) {
    console.log('clean');
    // body omitted
    cb();
}

function javascript(cb) {
    console.log('js');
    // body omitted
    cb();
}

function css(cb) {
    console.log('css');
    // body omitted
    cb();
}

function browser() {
    browserSync.init({
        server: {
            baseDir: './src/'
        },
        notify: false
    });

    browserSync.watch('./src/**/*.*').on('change', browserSync.reload);
}

exports.default = function () {
    // Or a composed task
    // watch('src/**/*.*', series(browser, clean, parallel(css, javascript)));
    browser();
};