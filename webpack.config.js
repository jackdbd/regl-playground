const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {

  context: path.resolve(__dirname, 'src'),

  entry: {
    home: path.join(__dirname, 'src', 'js', 'index.js'),
    'dots-2d': path.join(__dirname, 'src', 'js', 'dots-2d.js'),
    'dots-2d-shaders': path.join(__dirname, 'src', 'js', 'dots-2d-shaders.js'),
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[file].map',
  },

  module: {
    rules: [
      // rule for .js/.jsx files
      {
        test: /\.(js|jsx)$/,
        include: [
          path.join(__dirname, 'js', 'src'),
        ],
        exclude: [
          path.join(__dirname, 'node_modules'),
        ],
        use: {
          loader: 'babel-loader',
        },
      },
      // rule for css files
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src', 'css'),
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
      // rule for .glsl files (shaders)
      {
        test: /\.glsl$/,
        use: [
          {
            loader: 'webpack-glsl-loader',
          },
        ],
      },
    ],
  },

  target: 'web',

  devtool: 'source-map',

  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(
      ['dist'],
      { root: __dirname, exclude: ['favicon.ico'], verbose: true }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'templates', 'index.html'),
      hash: true,
      filename: 'index.html',
      chunks: ['commons', 'home'], // the order seems not important
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'templates', 'dots-2d.html'),
      hash: true,
      filename: 'dots-2d.html',
      chunks: ['commons', 'dots-2d'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'templates', 'dots-2d-shaders.html'),
      hash: true,
      filename: 'dots-2d-shaders.html',
      chunks: ['commons', 'dots-2d-shaders'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: '[name].[chunkhash].bundle.js',
      chunks: ['home', 'dots-2d', 'dots-2d-shaders'],
    }),
    new ExtractTextPlugin('[name].[chunkhash].bundle.css'),
  ],

  devServer: {
    host: 'localhost',
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
    inline: true,
    stats: {
      colors: true,
      reasons: true,
      chunks: false,
      modules: false,
    },
  },

  performance: {
    hints: 'warning',
  },

};
