'use strict';

// Load modules
var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    sourcemaps    = require('gulp-sourcemaps'),
    browserSync   = require('browser-sync'),
    useref        = require('gulp-useref'),
    gulpConcat    = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    jsMin         = require('gulp-jsmin'),
    gulpIf        = require('gulp-if'),
    cssnano       = require('gulp-cssnano'),
    rename        = require('gulp-rename'),
    imagemin      = require('gulp-imagemin'),
    clean         = require('gulp-clean'),
    cache         = require('gulp-cache'),
    del           = require('del'),
    runSequence   = require('run-sequence');

// Project directories and destinations
var sassInput         = 'assets/scss/**/*.scss',
    sassOutput        = 'assets/css',
    rootHtml          = '*.html',
    imageAssets       = 'assets/images/**/*.+(png|jpg|jpeg|gif|svg)',
    appDir            = 'app/*',
    serviceData       = 'app/service-data/**/*',
    serviceDataDist   = 'app/dist/service-data';

// Bower JS Files
var bowerJsFiles = [
      './bower_components/jquery/dist/jquery.js',
      './bower_components/angular/angular.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-cookies/angular-cookies.js',
      './bower_components/angular-mocks/angular-mocks.js',
      './bower_components/angular-resource/angular-resource.js',
      './bower_components/angular-route/angular-route.js',
      './bower_components/angular-sanitize/angular-sanitize.js',
      './bower_components/angular-scenario/angular-scenario.js',
      './bower_components/slick-carousel/slick/slick.js',
      './bower_components/angular-slick-carousel/dist/angular-slick.js',
      './bower_components/angular-touch/angular-touch.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/bootstrap/dist/js/collapse.js'
    ],
    bowerCssFiles = [
      './bower_components/animate.css/animate.css',
      './bower_components/bootstrap/dist/css/bootstrap.css',
      './bower_components/font-awesome/css/font-awesome.css',
      './bower_components/slick-carousel/slick/slick.css',
      './bower_components/slick-carousel/slick/slick-theme.css'
    ],
    fontsDir = [
      './bower_components/bootstrap/fonts/**/*',
      './bower_components/font-awesome/fonts/**/*'
    ],
    slickFonts = [
      './bower_components/slick-carousel/slick/fonts/**/*'
    ];

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: ''
        }
    })
});

gulp.task('sass', function() {
    return gulp.src(sassInput)
        .pipe(sass())
        .pipe(gulp.dest(sassOutput))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('buildstyles', function() {
    return gulp.src('assets/scss/main.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/dist/css'));
});

gulp.task('buildappscripts', function() {
    return gulp.src('app/**/*.js')
        .pipe(gulpConcat('main.js'))
        .pipe(jsMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/dist/js'));
});

gulp.task('setupservicedata', function() {
    return gulp.src(serviceData)
        .pipe(gulp.dest(serviceDataDist));
});

// Start copying third party libs ----------------------------------------------------
gulp.task('copythirdpartyjs', function() {
    return gulp.src(bowerJsFiles)
        .pipe(gulpConcat('vendor.js'))
        .pipe(jsMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/dist/js'));
});

gulp.task('copythirdpartycss', function() {
    gulp.src(bowerCssFiles)
        .pipe(gulpConcat('vendor.css'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/dist/css'));
});

// fonts task
gulp.task('fonts', function() {
    return gulp.src(fontsDir)
        .pipe(gulp.dest('app/dist/fonts'))
});

// slick fonts task
gulp.task('slickfonts', function() {
    return gulp.src(slickFonts)
        .pipe(gulp.dest('app/dist/css/fonts'))
});

// slick icon task
gulp.task('iconloader', function() {
    return gulp.src('./bower_components/slick-carousel/slick/ajax-loader.gif')
        .pipe(gulp.dest('app/dist/css'))
});
// End copying third party libs ----------------------------------------------------

// Setup project by copying all of the necessary bower_components into the app.
gulp.task('setupproject', function(callback) {
    runSequence(
        [
            'buildstyles',
            'setupservicedata',
            'buildappscripts',
            'copythirdpartyjs',
            'copythirdpartycss',
            'fonts',
            'slickfonts',
            'iconloader'
        ],
        callback
    )
});

gulp.task('watch', function() {
    gulp.watch(sassInput, ['sass']);
    gulp.watch(rootHtml, browserSync.reload);
    gulp.watch(appDir, browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('app/dist');
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'setupproject', 'browserSync', 'watch'],
        callback
    )
});
