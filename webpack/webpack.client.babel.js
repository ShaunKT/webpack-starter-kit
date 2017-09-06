'use strict'; // eslint-disable-line

// Libs
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HappyPack = require('happypack');

// Webpack Plugins
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Happy Pack Thread
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

// Configuration
const factor = require('./webpack.modules.config');

// Environment Target
import { nodeEnv, inDevelopment } from '../src/config/index';

// Directory Paths
const PATHS = {
  src: path.join(process.cwd(), './src'),
  app: path.join(process.cwd(), './src/index.js'),
  styles: path.join(process.cwd(), './src/styles'),
  build: path.join(process.cwd(), './build/'),
  nodeModules: /node_modules/,
};

// Common Webpack Configuration
const commonConfig = merge([
  {
    name: 'client',
    target: 'web',
    resolve: {
      modules: ['src', 'node_modules'],
      descriptionFiles: ['package.json'],
      extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
    },
    output: {
      path: path.join(process.cwd(), './build/static'),
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HappyPack({
        id: 'scripts',
        threadPool: happyThreadPool,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: inDevelopment,
              babelrc: true,
            },
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: PATHS.src,
          exclude: PATHS.nodeModules,
          use: 'happypack/loader?id=scripts',
        },
      ],
    },
    node: {
      fs: 'empty',
      vm: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  },
]);

// Development Configuration
const developmentConfig = merge([
  {
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3030',
      PATHS.app,
    ],
    output: {
      publicPath: 'http://localhost:3030/',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.IgnorePlugin(/webpack-stats\.json$/),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/views/index.ejs',
      }),
      new StyleLintPlugin({
        configFile: './stylelint.config.js',
        syntax: 'scss',
        failOnError: false,
      }),
      new HappyPack({
        id: 'styles',
        threadPool: happyThreadPool,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      }),
    ],
  },
  factor.lintJavaScript({
    include: PATHS.app,
    exclude: [PATHS.nodeModules, PATHS.styles],
    options: {
      emitWarning: false,
      emitError: true,
    },
  }),
  factor.loadCSS(),
  factor.fileLoader({
    exclude: PATHS.nodeModules,
    include: PATHS.src,
  }),
  factor.devServer({
    port: 3030,
  }),
]);

// Staging Configuration
const stagingConfig = merge([
  {
    cache: false,
    devtool: 'source-map',
    context: path.join(process.cwd()),
    entry: {
      main: PATHS.app,
    },
    output: {
      publicPath: '/static/',
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          minimize: true,
        },
      }),
      new ExtractTextPlugin({
        filename: 'styles/[name].css',
        allChunks: true,
        ignoreOrder: true,
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: JSON.stringify(nodeEnv),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          exclude: PATHS.nodeModules,
          include: PATHS.styles,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  sourceMap: true,
                  modules: true,
                  context: path.join(process.cwd(), './src'),
                  localIdentName: '[hash:base64:5]',
                  minimize: false,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'expanded',
                  sourceMap: true,
                  sourceMapContents: true,
                },
              },
            ],
          }),
        },
      ],
    },
  },
  factor.fileLoader({
    exclude: PATHS.nodeModules,
    include: PATHS.src,
    options: {
      name: '[name].[ext]',
      context: path.join(process.cwd(), './src'),
      publicPath: '/static/',
      outputPath: 'images/',
    },
  }),
  factor.uglifyJavaScript({
    sourceMap: true,
    uglifyOptions: {
      ie8: false,
      ecma: 8,
      mangle: true,
      output: {
        comments: true,
        beautify: true,
      },
      compress: true,
      warnings: true,
    },
  }),
  factor.purifyCSS({
    paths: glob.sync(
      `${PATHS.src}/**/**/**/*.js`, { nodir: true }
    ),
  }),
  factor.minifyCSS({
    options: {
      discardComments: {
        removeAll: false,
      },
      safe: true,
    },
  }),
  factor.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) =>
        resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/),
    },
    {
      name: 'manifest',
      minChunks: Infinity,
    },
  ]),
]);

// Production Configuration
const productionConfig = merge([
  {
    cache: false,
    devtool: 'hidden-source-map',
    context: path.join(process.cwd()),
    recordsPath: path.join(process.cwd(), 'records.json'),
    entry: {
      main: PATHS.app,
    },
    output: {
      publicPath: '/static/',
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          minimize: true,
        },
      }),
      new ExtractTextPlugin({
        filename: 'styles/[name].css',
        allChunks: true,
        ignoreOrder: true,
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: JSON.stringify(nodeEnv),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          exclude: PATHS.nodeModules,
          include: PATHS.styles,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  sourceMap: false,
                  modules: true,
                  context: path.join(process.cwd(), './src'),
                  localIdentName: '[hash:base64:5]',
                  minimize: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'expanded',
                  sourceMap: false,
                  sourceMapContents: false,
                },
              },
            ],
          }),
        },
      ],
    },
  },
  factor.fileLoader({
    exclude: PATHS.nodeModules,
    include: PATHS.src,
    options: {
      name: '[name].[ext]',
      context: path.join(process.cwd(), './src'),
      publicPath: '/static/',
      outputPath: 'images/',
    },
  }),
  factor.uglifyJavaScript({
    sourceMap: false,
    uglifyOptions: {
      ie8: false,
      ecma: 8,
      mangle: true,
      output: {
        comments: false,
        beautify: false,
      },
      compress: true,
      warnings: false,
    },
  }),
  factor.purifyCSS({
    paths: glob.sync(
      `${PATHS.src}/**/**/**/*.js`, { nodir: true }
    ),
  }),
  factor.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      safe: true,
    },
  }),
  factor.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) =>
        resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/),
    },
    {
      name: 'manifest',
      minChunks: Infinity,
    },
  ]),
]);

// Webpack Config
module.exports = env => {
  process.env.BABEL_ENV = env;

  if (env === 'staging') {
    return merge(commonConfig, stagingConfig);
  }

  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
