'use strict'; // eslint-disable-line

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals({
    whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
  })],
  devtool: 'hidden-source-map',
  context: path.join(process.cwd()),
  entry: { server: ['./src/server/server.js'] },
  output: {
    path: path.join(process.cwd(), './build'),
    filename: '[name].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [['es2015', { modules: false }], 'react', 'stage-0'],
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              // "context" and "localIdentName" need to be the same with client config,
              // or the style will flick when page first loaded
              context: path.join(process.cwd(), './src'),
              localIdentName: '[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'assets/images/[name].[hash:8].[ext]'
        },
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: { failOnError: true },
      },
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    descriptionFiles: ['package.json'],
    moduleExtensions: ['-loader'],
    extensions: ['.js', '.jsx', '.json'],
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: true,
    __dirname: true,
  },
};
