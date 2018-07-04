const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./webpack.config');

config.output.filename = '[name].[chunkhash:8].js';

config.plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css',
  }),
  new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify('production'),
  }),
);

config.devtool = 'hidden-source-map';

module.exports = config;