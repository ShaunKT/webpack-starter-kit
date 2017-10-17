'use strict'; // eslint-disable-line

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  name: 'server',
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i]
    })
  ],
  devtool: 'hidden-source-map',
  context: path.join(process.cwd()),
  entry: { server: ['./src/server/server.js'] },
  output: {
    path: path.join(process.cwd(), './build'),
    chunkFilename: '[name]_[chunkhash].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/'
  },
  resolve: {
    modules: ['src', 'node_modules'],
    descriptionFiles: ['package.json'],
    extensions: ['.js', '.jsx', '.json', '.scss', '.css']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: true
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              root: path.join(process.cwd(), './src'),
              importLoaders: 1,
              context: path.join(process.cwd(), './src'),
              localIdentName: '[hash:base64:5]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          context: path.join(process.cwd(), './src'),
          publicPath: '/static/',
          outputPath: 'fonts/',
          emitFile: false
        }
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          context: path.join(process.cwd(), './src'),
          publicPath: '/static/',
          outputPath: 'images/',
          emitFile: false
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin(),
    new webpack.BannerPlugin({
      banner: 'global.assets = require("./assets.json");',
      raw: true
    }),
    new webpack.LoaderOptionsPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: true,
    __dirname: true
  }
};
