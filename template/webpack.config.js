const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const postcssConfig = {
  plugins: [
    precss,
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9',
      ],
      flexbox: 'no-2009',
    }),
  ],
};

module.exports = {
  entry: './src/index.js',

  output: {
    filename: '[name].[hash:8].js', // why must be hash rather than chunkhash ?
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: postcssConfig,
          },
          {
            loader: 'less-loader',
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
        include: /node_modules/,
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      // chunksSortMode: 'none',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'source-map',

  devServer: {
    hot: true,
    historyApiFallback: true,
    open: true,
    contentBase: path.join(__dirname, 'public'),
  },
};