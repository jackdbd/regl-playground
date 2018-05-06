const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  target: "web",

  context: path.resolve(__dirname, 'src'),

  entry: {
    home: path.join(__dirname, 'src', 'js', 'index.js'),
    'dots-2d': path.join(__dirname, 'src', 'js', 'dots-2d.js'),
    'dots-2d-shaders': path.join(__dirname, 'src', 'js', 'dots-2d-shaders.js'),
    'batch-rendering': path.join(__dirname, 'src', 'js', 'batch-rendering.js'),
    'one-shot-rendering': path.join(__dirname, 'src', 'js', 'one-shot-rendering.js'),
    bunny: path.join(__dirname, 'src', 'js', 'bunny.js'),
    'tween-circles-blending': path.join(__dirname, 'src', 'js', 'tween-circles-blending.js'),
    sprites: path.join(__dirname, 'src', 'js', 'sprites.js'),
    'regl-and-d3': path.join(__dirname, 'src', 'js', 'regl-and-d3.js'),
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[chunkhash].js",
    chunkFilename: "[id].bundle.js"
  },

  devtool: 'source-map',

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
      // rule for .css/.sass/.scss files
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              // importLoaders allows to configure how many loaders before css-loader should be applied to @imported resources.
              // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
              importLoaders: 2,
              sourceMap: true,
              minimize: { safe: true }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
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
      // rule for textures (images)
      {
        test: /\.(jpe?g|png)$/i,
        include: path.join(__dirname, "src", "textures"),
        loaders: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: "65-90",
                speed: 4
              }
            }
          }
        ]
      }
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        js: {
          test: /\.js$/,
          name: "commons",
          chunks: "all",
          minChunks: 7
        },
        css: {
          test: /\.(css|sass|scss)$/,
          name: "commons",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  },

  plugins: [
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(
      ['dist'],
      { root: __dirname, exclude: ['favicon.ico'], verbose: true }),
    new MiniCssExtractPlugin({
        filename: "[chunkhash].css",
        chunkFilename: "[id].bundle.css"
      }),
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'templates', 'batch-rendering.html'),
      hash: true,
      filename: 'batch-rendering.html',
      chunks: ['commons', 'batch-rendering'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'templates', 'one-shot-rendering.html'),
      hash: true,
      filename: 'one-shot-rendering.html',
      chunks: ['commons', 'one-shot-rendering'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'templates', 'bunny.html'),
      hash: true,
      filename: 'bunny.html',
      chunks: ['commons', 'bunny'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'templates', 'tween-circles-blending.html'),
      hash: true,
      filename: 'tween-circles-blending.html',
      chunks: ['commons', 'tween-circles-blending'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'templates', 'sprites.html'),
      hash: true,
      filename: 'sprites.html',
      chunks: ['commons', 'sprites'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'templates', 'regl-and-d3.html'),
      hash: true,
      filename: 'regl-and-d3.html',
      chunks: ['commons', 'regl-and-d3'],
    }),
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
