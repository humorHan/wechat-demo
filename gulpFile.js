/**
 * Created by humorHan on 2016/5/13.
 */
var webpackConfig = require('./webpack-config.js');

var webpack = require('webpack-stream');

var gulp = require('gulp');

var path = require('path');

var plumber = require('gulp-plumber'); //捕获出错问题 接收errorHandler参数

var named = require('vinyl-named'); //保证输入和输出一个文件名字

var minifycss = require('gulp-minify-css');

var minifyHTML = require("gulp-minify-html");

//删除文件
var del = require('del');

//删除文件
var vinylPaths = require('vinyl-paths');

var rev = require('gulp-rev');

var revCollector = require('gulp-rev-collector');

gulp.task("css", function(){
    return gulp.src(path.join(__dirname, './css/**/*.css'))
        .pipe(plumber())
        .pipe(gulp.dest(path.join(__dirname, '/bundle/css/')));
});

gulp.task('watch:css',function(){
    gulp.watch(path.join(__dirname , './css/**/*.css'), ['css']);
});

gulp.task('js-dev', ['publish-static-js'],function(){
    return gulp.src(path.join(__dirname, '/js/**/*.js'))
        .pipe(named())
        .pipe(webpack(webpackConfig(true, true, false)))
        .pipe(gulp.dest(path.join(__dirname, '/bundle/js/')));
});

gulp.task('js', ['publish-static-js'],function(){
    return gulp.src(path.join(__dirname, '/js/**/*.js'))
        .pipe(named())
        .pipe(webpack(webpackConfig(false, false, false)))
        .pipe(gulp.dest(path.join(__dirname, '/bundle/js/')));
});

gulp.task('watch:js-dev',function(){
    gulp.watch(path.join(__dirname , '/js/**/*.js'), ['js-dev']);
});

gulp.task('publish-static-js',function(){
    return gulp.src([path.join(__dirname, '/dep/zepto.min.js')])
        .pipe(gulp.dest(path.join(__dirname, '/bundle/js/')));
});

gulp.task('publish-img',function(){
    return gulp.src(path.join(__dirname, '/img/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname, '/bundle/img/')));
});

//测试包
gulp.task('bundle',['publish-img','js-dev','css', 'watch:css']);

//正式包(不压缩和不提取公共模块 不版本化)
gulp.task('pack',['publish-img','js','css']);

//正式包（不压缩和不提取公共模块）
gulp.task('package', ['rev-css']);

gulp.task('rev-css', ['rev-js'], function(){
    return gulp.src([path.join(__dirname, '/mfg/rev/*.json'), path.join(__dirname, '/mfg/bundle/css/**/*.css')])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(path.join(__dirname, '/mfg/bundle/css')))
});

//修改js中引用地址
gulp.task('rev-js', ['rev-html'], function(){
    return gulp.src([path.join(__dirname, '/mfg/rev/*.json'), path.join(__dirname, '/mfg/bundle/js/**/*.js')])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(path.join(__dirname, '/mfg/bundle/js')))
});

//修改html页面引用的css和js
gulp.task('rev-html', ['dist-img'], function(){
    return gulp.src([path.join(__dirname, '/mfg/rev/*.json'), path.join(__dirname, '/mfg/html/**/*.html')])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(path.join(__dirname, '/mfg/html/')))
});

gulp.task('dist-img',['minifyjs'], function(){
    return gulp.src(path.join(__dirname, '/img/**/*.*'))
        //.pipe(gulp.dest(path.join(__dirname, '/mfg/bundle/img')));
        .pipe(rev())
        .pipe(gulp.dest(path.join(__dirname, '/mfg/bundle/img')))
        .pipe(rev.manifest('img.json'))
        .pipe(gulp.dest(path.join(__dirname, '/mfg/rev')));
});

gulp.task('minifyjs',['dist-static-js'],function() {
    return gulp.src(path.join(__dirname, '/js/**/*.js'))
        .pipe(named())
        .pipe(webpack(webpackConfig(false, false, false)))
        .pipe(rev())
        .pipe(gulp.dest(path.join(__dirname, '/mfg/bundle/js/')))
        .pipe(rev.manifest('js.json'))
        .pipe(gulp.dest(path.join(__dirname, '/mfg/rev')));
});

gulp.task('dist-static-js',['minifycss'],function(){
    return gulp.src([path.join(__dirname, '/dep/zepto.min.js')])
        .pipe(gulp.dest(path.join(__dirname, '/mfg/bundle/js')));
});

gulp.task('minifycss',['minifyHTML'],function() {
    return gulp.src(path.join(__dirname, '/css/**/*.css'))
        //.pipe(minifycss())
        //.pipe(minifycss({keepBreaks:true,compatibility:'ie8,+spaceAfterClosingBrace'}))
        .pipe(rev())
        .pipe(gulp.dest(path.join(__dirname, '/mfg/bundle/css/')))
        .pipe(rev.manifest('css.json'))
        .pipe(gulp.dest(path.join(__dirname, '/mfg/rev')));
});

gulp.task('minifyHTML',['del-dist'],function() {
    var opts = {comments:false,spare:false,quotes:true,collapseWhitespace: false,removeComments: true};
    return gulp.src(path.join(__dirname, '/html/**/*.html'))
        //.pipe(minifyHTML(opts))
        .pipe(rev())
        .pipe(gulp.dest(path.join(__dirname, '/mfg/html')))
        .pipe(rev.manifest('html.json'))
        .pipe(gulp.dest(path.join(__dirname, '/mfg/rev')));
});

//删除上线文件
gulp.task('del-dist',function(){
    return gulp.src(path.join(__dirname,'mfg'), {read: false})
        .pipe(vinylPaths(del));
});