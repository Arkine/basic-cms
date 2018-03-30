const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const javascript = {
	test: /\.(js)$/,
	use: [{
		loader: 'babel-loader',
		options: { presets: ['env'] }
	}]
}

const postcss = {
	loader: 'postcss-loader',
	options: {
		plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]}
	}
}

const styles = {
	test: /\.(scss)$/,
	use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?soureceMap'])
}

// const uglify = new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
// 	compress: { warnings: false }
// });

const config = {
	mode: 'none',
	entry: {
		App: './src/public/javascripts/index.js'
	},
	devtool: 'sourece-map',
	output: {
		path: path.resolve(__dirname, 'src', 'public', 'dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [javascript, styles]
	},
	plugins: [
		new ExtractTextPlugin('style.css')
	]
};

process.noDeprecation = true;

module.exports = config;
