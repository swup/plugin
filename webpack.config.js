const webpack = require('webpack');
const baseConfig = require('@swup/webpack-config');

const config = Object.assign({}, baseConfig, {
	entry: {
		SwupPlugin: './entry.js',
		'SwupPlugin.min': './entry.js'
	},
	output: {
		path: __dirname + '/dist/',
		library: 'SwupPlugin',
		libraryTarget: 'umd',
		filename: '[name].js'
	}
});

module.exports = config;
