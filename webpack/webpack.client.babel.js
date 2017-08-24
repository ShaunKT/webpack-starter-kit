/* eslint-disable */
"use strict";

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HappyPack = require('happypack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Happy Pack Thread
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

// Environment Target
const nodeEnv = process.env.NODE_ENV || 'development';
const inDevelopment = process.env.NODE_ENV === 'development';
const inStaging = process.env.NODE_ENV === 'staging';
const inProduction = process.env.NODE_ENV === 'production';

// Webpack Modules
const factor = require('./webpack.modules.config');

// Webpack Isomorphic Tools Plugin
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack.isomorphic.config')).development(inDevelopment);

// Directory Paths
const PATHS = {
  app: path.join(process.cwd(), './src/'),
  styles: path.join(process.cwd(), './src/styles'),
  build: path.join(process.cwd(), './build/'),
  public: '/',
  nodeModules: /node_modules/,
};

// Setting the entry for development/prodcution
const getEntry = () => {
  // For development
  let entry = [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    PATHS.app,
  ];

  // For prodcution
  if (!inDevelopment) {
    entry = {
      bundle: PATHS.app
    };
  }
  return entry;
};

// Common Webpack Configuration
const commonConfig = merge([
  {
    name: 'client',
    target: 'web',
    cache: inDevelopment,
    devtool: inDevelopment || inStaging ? 'cheap-module-eval-source-map' : 'hidden-source-map',
    context: path.join(process.cwd()),
    entry: getEntry(),
    output: {
      path: path.join(process.cwd(), './build/assets/'),
      publicPath: '/assets/',
      filename: inDevelopment ? 'js/[name].js' : 'js/[name].[chunkhash:8].js',
      chunkFilename: inDevelopment ? 'js/[name].chunk.js' : 'js/[name].[chunkhash:8].chunk.js',
      pathinfo: inDevelopment,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.scss', '.css']
    },
    plugins: [
      new HappyPack({
        id: 'js',
        threadPool: happyThreadPool,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: inDevelopment,
              babelrc: true,
            }
          }
        ],
      }),
      new ExtractTextPlugin({
        filename: 'styles/[name].[contenthash:8].css',
        allChunks: true,
        disable: inDevelopment,
        ignoreOrder: false,
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: { failOnError: true },
          context: '/',
          debug: inDevelopment,
          minimize: inStaging || inProduction,
        },
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: JSON.stringify(nodeEnv)
      }),
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __DEV__: inDevelopment,
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      webpackIsomorphicToolsPlugin,
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: PATHS.app,
          exclude: PATHS.nodeModules,
          use: 'happypack/loader?id=js',
        },
        {
          test: /\.(css|scss)$/,
          include: PATHS.styles,
          exclude: PATHS.nodeModules,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  sourceMap: inDevelopment || inStaging,
                  modules: true,
                  context: path.join(process.cwd(), './src'),
                  localIdentName: inDevelopment ? '[name]__[local].[hash:base64:5]' : '[hash:base64:5]',
                  minimize: inStaging || inProduction,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: inDevelopment || inStaging,
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'expanded',
                  sourceMap: inDevelopment || inStaging,
                  sourceMapContents: inStaging || inProduction,
                },
              },
            ],
          }),
        },
        {
          test: webpackIsomorphicToolsPlugin.regular_expression('images'),
          exclude: PATHS.nodeModules,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1000,
                name: 'images/[name].[hash:8].[ext]'
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true
              },
            }
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          exclude: PATHS.nodeModules,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1000,
                name: 'fonts/[name].[hash:8].[ext]'
              },
            }
          ],
        },
      ],
    },
    node: {
      fs: 'empty',
      vm: 'empty',
      net: 'empty',
      tls: 'empty',
    }
  }
]);

// Development Webpack Config
const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new StyleLintPlugin({
        configFile: './stylelint.config.js',
        syntax: 'scss'
      }),
      new webpack.IgnorePlugin(/webpack-stats\.json$/)
    ],
  },
  factor.lintJavaScript({
    include: PATHS.app,
    exclude: [PATHS.nodeModules, PATHS.styles],
    options: {
      emitWarning: true,
      emitError: true
    }
  })
]);

// Staging Config
const stagingConfig = merge([
  {
    recordsPath: path.join(process.cwd(), 'records.json'),
    plugins: [
      new HtmlWebpackPlugin({
        filename: path.join(process.cwd(), './build/index.html'),
        template: path.resolve(process.cwd(), './src/views/index.ejs'),
        minify: {
          collapseWhitespace: false,
          removeComments: false,
          removeRedundantAttributes: false
        }
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin()
    ],
  },
  factor.minifyJavaScript({
    sourceMap: true,
    compress: {
      warnings: false,
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true,
      drop_console: false,
      drop_debugger: false,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true
    }
  }),
  factor.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      )
    },
    {
      name: 'manifest',
      minChunks: Infinity
    }
  ]),
  factor.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/**/**/*.js`,
      { nodir: true }
    ),
  }),
  factor.minifyCSS({
    options: {
      discardComments: {
        removeAll: false
      },
      safe: true
    }
  }),
]);

// Production Config
const productionConfig = merge([
  {
    recordsPath: path.join(process.cwd(), 'records.json'),
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(process.cwd(), './src/views/index.ejs'),
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true
        }
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin()
    ],
  },
  factor.minifyJavaScript({
    sourceMap: false,
    compress: {
      warnings: false,
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true,
      drop_console: true,
      drop_debugger: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true
    }
  }),
  factor.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      )
    },
    {
      name: 'manifest',
      minChunks: Infinity
    }
  ]),
  factor.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/**/**/*.js`,
      { nodir: true }
    ),
  }),
  factor.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      safe: true
    }
  }),
]);

// Webpack Config
module.exports = (env) => {
  process.env.BABEL_ENV = env;

  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
