const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./webpack.config');

config.output.filename = '[name].js';

config.plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].css',
  }),
  new webpack.HotModuleReplacementPlugin(),
);

config.devtool = 'cheap-module-source-map';

config.devServer = {
  hot: true,
  historyApiFallback: true,
  open: true,
  contentBase: path.join(__dirname, 'public'),
  watchOptions: {
    ignored: /node_modules/,
  },
};

module.exports = config;