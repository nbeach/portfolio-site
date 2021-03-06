var gulp = require('gulp'); 

//Plugins
var del = require('del');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var less = require('gulp-less');

var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var sourcemaps = require('gulp-sourcemaps');


//Clean
gulp.task('clean', function() {
    del('dist/*');
});


//HTML
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});


//LESS
gulp.task('less', function() {
    return gulp.src('src/styles/portfolio.less') 
        .pipe(less())
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename('portfolio.min.css'))
        .pipe(sourcemaps.init())
        .pipe(cssmin())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles'));
});


//JS
gulp.task('js', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.js',
                    'node_modules/lightbox2/dist/js/lightbox.js',
                    'src/scripts/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('portfolio.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename('portfolio.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/scripts'));
});


//Images
gulp.task('images', function() {
    return gulp.src(['src/images/**/*',
                    'node_modules/lightbox2/dist/images/**/*'])
        .pipe(gulp.dest('dist/images'));
});


//Fonts
gulp.task('fonts', function() {
    return gulp.src(['src/fonts/**/*',
                    'node_modules/bootstrap/dist/fonts/**/*'])
        .pipe(gulp.dest('dist/fonts'));
});


//Files
gulp.task('files', function() {
    return gulp.src('src/files/**/*')
        .pipe(gulp.dest('dist/files'));
});


//Watcher
gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/styles/**/*', ['less']);
    gulp.watch('src/scripts/**/*', ['js']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/fonts/**/*', ['fonts']);
    gulp.watch('src/files/**/*', ['files']);
});

// Default Task
gulp.task('default', ['html', 'less', 'js', 'fonts', 'images', 'files']);