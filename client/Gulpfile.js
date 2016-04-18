// Gulpfile.js

var gulp 		= require('gulp');
var sass 		= require('gulp-sass');
var browserify 	= require('browserify');
var source 		= require('vinyl-source-stream');
var buffer		= require('vinyl-buffer');
var babel 		= require('babelify');

// This task compiles sass into css.
gulp.task('styles', ()=> {
	return gulp.src('./src/css/main.scss')
		.pipe(sass('main.css'))
		.pipe(gulp.dest('../public/css'));
});

// This task bundles our scripts using browserify.
gulp.task('scripts', ()=> {
	return browserify('./src/js/app.js')
		.transform(babel, {presets: ["react", "es2015"]}) 
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('../public/js'));

});

// This task keeps an eye on our source files and rebuilds them when they change.
gulp.task('watch', ()=> {
	gulp.watch('./src/css/**/*.scss', 	['sass']);
	gulp.watch('./src/js/**/*.js', 		['scripts']);
})

gulp.task('dev', ['scripts', 'styles', 'watch']);