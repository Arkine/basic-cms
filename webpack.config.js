const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

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
		plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]},
		sourceMap: 'inline'
	}
}

const styles = {
	test: /\.(scss)$/,
	use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
}

// const uglify = new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
// 	compress: { warnings: false }
// });

const config = {
	mode: 'development',
	entry: {
		App: './src/public/javascripts/index.js'
	},
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'src', 'public', 'dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [javascript, styles]
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new BrowserSyncPlugin({
			proxy: 'http://localhost:7777',
			host: 'http://localhost',
			port: 3000,
		})
	]
};

process.noDeprecation = true;

module.exports = config;
