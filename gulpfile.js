const gulp = require('gulp');
const del = require('del');
const cache = require('gulp-cache');
const postcss = require("gulp-postcss");
const autoprefixer = require('autoprefixer');
const postcssCsso = require('postcss-csso');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rollup = require('rollup-stream');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const imagemin = require('gulp-imagemin');

const { series, parallel } = require('gulp');

// Styles
function styles() {
	return gulp.src('test/styles/styles.css')
		.pipe(postcss([
			autoprefixer,
			postcssCsso,
		]))
		.pipe(replace('/../../fonts', '/fonts'))
		.pipe(gulp.dest('dist/styles'));
}

// Scripts
function scripts() {
	return rollup({
		input: 'test/scripts/scripts.js',
		format: 'iife',
	})
	.pipe(source('scripts.js'))
	.pipe(buffer())
	.pipe(babel({
		presets: ['@babel/preset-env'],
	}))
	.pipe(terser())
	.pipe(gulp.dest('dist/scripts'));
}

// Clean
function clean() {
	return del([
		'dist'
	]);
}

// Copy and minification
function copy(cb) {
	// Fonts
	gulp.src('test/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	// Assets and Images
	let $imageminOptions = [
		imagemin.gifsicle({interlaced: true}),
		imagemin.mozjpeg({progressive: true}),
		imagemin.optipng({optimizationLevel: 7}),
		imagemin.svgo({plugins: [{removeViewBox: true}]})
	];

	gulp.src('test/assets/**/*')
		.pipe(cache(imagemin($imageminOptions)))
		.pipe(gulp.dest('dist/assets'));
	gulp.src('test/images/**/*')
		.pipe(cache(imagemin($imageminOptions)))
		.pipe(gulp.dest('dist/images'));

	// html
	gulp.src('test/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('dist'));

	// txt
	gulp.src('src/*.txt')
		.pipe(gulp.dest('dist'));

	// Webmanifest
	gulp.src('src/manifest.json')
		.pipe(gulp.dest('dist'));

	cb();
}

exports.build = series(
	clean,
	parallel(scripts, styles),
	copy
);
