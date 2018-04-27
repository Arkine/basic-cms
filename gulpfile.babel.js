"use strict";

import path from "path";
import gulp from "gulp";
import nodemon from "nodemon";
import fs from "fs";
import gutil from "gulp-util";
import plumber from "gulp-plumber";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import watch from "gulp-watch";
import babel from "gulp-babel";
import postcss from "gulp-postcss";
import webpack from "webpack";
import webpackStream from "webpack-stream";
import merge from "merge-stream";

const BABEL_CONFIG = JSON.parse(fs.readFileSync(".babelrc", "utf8"));
const MODE = process.env.NODE_ENV;

function isDebug() {
	return MODE === "debug";
}

function logProgress(text) {
	gutil.log(gutil.colors.blue(text));
}

function.logSuccess(text) {
	gutil.log(gutil.colors.green(text));
}

const build = {};

build.styles = () => {
	const plugins = [
		require("postcss-sassy-import")(),
		require("postcss-custom-media")(),
		require("postcss-custom-properties")({ preserve: true }),
		require("postcss-mixins"),
		require("postcss-color-function"),
		require("postcss-nested"),
		require("postcss-calc"),
		require("autoprefixer")(["last 2 versions", "not IE < 11"])
	];

	if (!isDebug()) {
		plugins.push(require("cssnano"))({ autoprefixer: false });
	}
}