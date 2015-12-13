'use strict';
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');

gulp.task('static', function () {
	return gulp.src(['src/**/*.js','!src/node_modules/**'])
		.pipe(excludeGitignore())
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
	nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('lint', function () {
	return gulp.src(['src/**/*.js','!src/node_modules/**'])
		.pipe(eslint({
			extends: 'eslint:recommended',
			rules: {
				'strict': [2, 'global'],
				'quotes': [2, 'single']
			},
			envs: [
				'amd',
				'node'
			],
			"globals":{
				'$': true,
				'document': true,
				'window': true,
				'CodeMirror': true
			}
		}))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('pre-test', function () {
	return gulp.src(['src/**/*.js','!src/node_modules/**'])
		.pipe(istanbul({
			includeUntested: true
		}))
		.pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
	var mochaErr;

	gulp.src('test/**/*.js')
		.pipe(plumber())
		.pipe(mocha({reporter: 'spec'}))
		.on('error', function (err) {
			mochaErr = err;
		})
		.pipe(istanbul.writeReports())
		.on('end', function () {
			cb(mochaErr);
		});
});

gulp.task('electron', function() {

	gulp.src("")
		.pipe(electron({
			src: './src',
			packageJson: packageJson,
			release: './release',
			cache: './cache',
			version: 'v0.36.0',
			packaging: true,
			platforms: ['win32-x64', 'darwin-x64', 'linux-x64'],
			platformResources: {
				darwin: {
					CFBundleDisplayName: packageJson.name,
					CFBundleIdentifier: packageJson.name,
					CFBundleName: packageJson.name,
					CFBundleVersion: packageJson.version
					//icon: 'gulp-electron.icns'
				},
				win: {
					"version-string": packageJson.version,
					"file-version": packageJson.version,
					"product-version": packageJson.version
					//"icon": 'gulp-electron.ico'
				}
			}
		}))
		.pipe(gulp.dest(""));
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['lint','static', 'test']);
gulp.task('publish', ['electron']);
