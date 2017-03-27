//定义依赖和插件
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	less   = require('gulp-less'),
	minifyCss =require('gulp-minify-css'),
	uglify =require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	connect = require('gulp-connect'); //livereload

//js路径
var jsSrc = 'src/js/*.js';
var jsDist = 'dist/js';
//css路径
var lessSrc = 'src/less/*.less';
var lessDist = 'dist/css';
//图片路径
var imgSrc = 'src/images/*.*';
var imgDist = 'dist/images';
//html路径
var htmlSrc = ['src/index.html','src/views/*.html'];
var htmlDist = 'dist/html';



//定义html任务
gulp.task('html', function() {

	gulp.src(htmlSrc)
		.pipe(gulp.dest(htmlDist))
		.pipe(connect.reload());
});
//定义名为less的任务
gulp.task('less', function() {

	gulp.src(lessSrc)
		.pipe(concat('main.css'))
		.pipe(minifyCss())//压缩css
		.pipe(gulp.dest(lessDist))
		.pipe(connect.reload());
});
//定义名为js的任务
gulp.task('js', function() {

	gulp.src(jsSrc)
		.pipe(concat('main.js'))
		.pipe(uglify())//压缩js
		.pipe(gulp.dest(jsDist))
		.pipe(connect.reload())
});

//定义images任务
gulp.task('images',function(){
	gulp.src(imgSrc)
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest(imgDist))
})
//定义livereload任务
gulp.task('connect', function() {
	connect.server({
		livereload: true
	});
});

//定义看守任务
gulp.task('watch', function() {

	gulp.watch(htmlSrc, ['html']);
	gulp.watch(lessSrc, ['less']);
	gulp.watch(jsSrc, ['js']);
	gulp.watch(imgSrc,['images']);

});

//定义默认任务
gulp.task('default', ['html', 'less','js', 'images','watch', 'connect']);
