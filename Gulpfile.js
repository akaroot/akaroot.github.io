var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');


var config = {

    production: !! gutil.env.production,

    baseDir     : 'resources',
    outFile     : 'assets',

    jsSrc     : [
        'js/jquery-1.10.2.min.js',
        'js/jquery.easing.1.3.js',
        'js/jquery.carouFredSel-6.2.1.js',
        'js/waypoints.min.js',
        'js/jquery.easypiechart.min.js',
        'js/TweenMax.min.js',
        'js/jquery.isotope.min.js',
        'js/jquery.magnific-popup.min.js',
        'js/gmap3.js',
        'js/jquery.placeholder.js',
        'js/perfect-scrollbar.js',
        'js/jquery.mousewheel.min.js',
        'js/jquery.stellar.min.js',
        'js/custom.js',
        'js/ocanvas-2.5.1.min.js'
    ],

    cssSrc    : [
        'css/bootstrap.min.css',
        'css/font-awesome.min.css',
        'css/magnific-popup.css',
        'css/jquery.placeholder.css',
        'css/perfect-scrollbar.css',
        'css/animate.min.css',
        'css/style.css',
        'css/styles/default.css',
        'css/custom-style.css'
    ]
};

gulp.task('default', function(callback) {
    runSequence(['scripts', 'styles'], callback);
});

gulp.task('watch', ['default'], function() {
    // watch for js/css changes
    gulp.watch( buildPaths(config.jsSrc), ['scripts']);
    gulp.watch( buildPaths(config.cssSrc), ['styles']);

})


gulp.task('scripts', function() {
    var destDir = 'js';

    return gulp.src( buildPaths(config.jsSrc) )
        .pipe(concat({ path: config.outFile+'.js', stat:{mode:0666} }))
        .pipe( config.production  ? uglify({mangle:false}) : gutil.noop() )
        .pipe(gulp.dest(destDir))
        .on('error', gutil.log);
});

gulp.task('styles', function() {
    var destDir = 'css';

    return gulp.src( buildPaths(config.cssSrc) )
        .pipe(concat({ path: config.outFile+'.css', stat:{mode:0666} }))
        .pipe( config.production  ? minifyCSS({keepBreaks:true, keepSpecialComments:0}) : gutil.noop() )
        .pipe(gulp.dest(destDir))
        .on('error', gutil.log);
});


gulp.task('jslint', function() {
    gulp.src( 'resources/assets/js/custom/*' )
    .pipe(jshint())
    .pipe(jshint.reporter())
    .on('error', gutil.log);
});


function buildPaths(sources){
    return sources.map(function(source) {
      return config.baseDir + '/' + source;
    });
}



