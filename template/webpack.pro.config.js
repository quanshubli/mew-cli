const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const config = require('./webpack.config');

config.output.filename = '[name].[chunkhash:8].js';

config.plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css',
  }),
  new ParallelUglifyPlugin({
    uglifyJS: {
      output: {
        beautify: false,
        comments: false,
      },
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true,
      },
    },
  }),
  new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify('production'),
  }),
);

config.devtool = 'hidden-source-map';

module.exports = config;