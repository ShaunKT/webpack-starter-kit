'use strict'; // eslint-disable-line

// Libs
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HappyPack = require('happypack');

// Webpack Plugins
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Happy Pack Thread
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

// Configuration
const factor = require('./webpack.modules.config');

// Environment Target
import { nodeEnv, inDevelopment, inProduction } from '../src/config/index';

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
    context: path.join(process.cwd()),
    output: {
      path: path.join(process.cwd(), './build/static'),
      publicPath: '/static/',
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },
    resolve: {
      modules: ['src', 'node_modules'],
      descriptionFiles: ['package.json'],
      moduleExtensions: ['-loader'],
      extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
    },
    plugins: [
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
      new ExtractTextPlugin({
        filename: 'styles/[name].css',
        allChunks: true,
        disable: inDevelopment,
        ignoreOrder: true,
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: JSON.stringify(nodeEnv),
      }),
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __DEV__: inDevelopment,
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          context: '/',
          debug: inDevelopment,
        },
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HashedModuleIdsPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: PATHS.src,
          exclude: PATHS.nodeModules,
          use: 'happypack/loader?id=scripts',
        },
        {
          test: /\.(css|scss|sass)$/,
          exclude: PATHS.nodeModules,
          include: PATHS.src,
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
                  localIdentName: inDevelopment
                    ? '[name]__[local].[hash:base64:5]'
                    : '[hash:base64:5]',
                  minimize: inProduction,
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
                  sourceMapContents: inProduction,
                },
              },
            ],
          }),
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          exclude: PATHS.nodeModules,
          include: PATHS.src,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                context: path.join(process.cwd(), './src'),
                publicPath: '/static/',
                outputPath: 'images/',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: { bypassOnDebug: true },
            },
          ],
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
    entry: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      PATHS.app,
    ],
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
      pathinfo: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.IgnorePlugin(/webpack-stats\.json$/),
      new StyleLintPlugin({
        configFile: './stylelint.config.js',
        syntax: 'scss',
        failOnError: false,
      }),
    ],
  },
  factor.lintJavaScript({
    include: PATHS.app,
    exclude: [PATHS.nodeModules, PATHS.styles],
    options: {
      emitWarning: true,
      emitError: true,
    },
  }),
]);

// Production Configuration
const productionConfig = merge([
  {
    entry: {
      main: PATHS.app,
    },
    cache: false,
    devtool: 'hidden-source-map',
    recordsPath: path.join(process.cwd(), 'records.json'),
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          minimize: true,
        },
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
  },
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
  factor.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      safe: true,
    },
  }),
]);

// Webpack Config
module.exports = env => {
  process.env.BABEL_ENV = env;

  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
