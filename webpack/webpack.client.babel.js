'use strict';

// Libs
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HappyPack = require('happypack');

// Webpack Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsByTypePlugin = require('webpack-assets-by-type-plugin');

// Happy Pack Thread
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

// Configuration
const factor = require('./webpack.modules.config');
const { host, port, nodeEnv, inDevelopment, inProduction } = require('../src/config');

// Directory Paths
const PATHS = {
  src: path.join(process.cwd(), './src'),
  app: path.join(process.cwd(), './src/index.js'),
  styles: path.join(process.cwd(), './src/styles'),
  build: path.join(process.cwd(), './build/'),
  nodeModules: /node_modules/
};

// Common Webpack Configuration
const commonConfig = merge([
  {
    name: 'client',
    target: 'web',
    resolve: {
      modules: ['src', 'node_modules'],
      descriptionFiles: ['package.json'],
      extensions: ['.js', '.jsx', '.json', '.scss', '.css']
    },
    plugins: [
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
              babelrc: true
            }
          }
        ]
      })
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: PATHS.src,
          exclude: PATHS.nodeModules,
          use: 'happypack/loader?id=scripts'
        }
      ]
    },
    node: {
      fs: 'empty',
      vm: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  }
]);

// Development Configuration
const developmentConfig = merge([
  {
    cache: false,
    devtool: 'cheap-module-eval-source-map',
    entry: ['babel-polyfill', 'react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:3030', PATHS.src],
    output: {
      filename: '[name].js',
      path: path.join(process.cwd(), '/'),
      publicPath: 'http://localhost:3030/'
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HappyPack({
        id: 'styles',
        threadPool: happyThreadPool,
        loaders: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            query: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      })
    ]
  },
  factor.loadCSS(),
  factor.fontLoader(),
  factor.imageLoader({
    exclude: PATHS.nodeModules,
    include: PATHS.src,
    options: {
      name: '[name].[ext]'
    }
  }),
  factor.devServer({
    port: 3030
  })
]);

// Production Configuration
const productionConfig = merge([
  {
    cache: true,
    devtool: 'hidden-source-map',
    context: path.join(process.cwd()),
    recordsPath: path.join(process.cwd(), 'records.json'),
    entry: {
      main: PATHS.src
    },
    output: {
      publicPath: '/static/',
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
      path: path.join(process.cwd(), './build/static')
    },
    plugins: [
      new AssetsByTypePlugin({ path: path.join(PATHS.build, 'assets.json') }),
      new webpack.LoaderOptionsPlugin({
        options: {
          minimize: true
        }
      }),
      new ExtractTextPlugin({
        filename: 'styles/[name].css',
        allChunks: true,
        ignoreOrder: true
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: JSON.stringify(nodeEnv)
      })
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
                  minimize: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'expanded',
                  sourceMap: false,
                  sourceMapContents: false
                }
              }
            ]
          })
        }
      ]
    }
  },
  factor.fontLoader({
    exclude: PATHS.nodeModules,
    include: PATHS.src,
    options: {
      name: '[name].[ext]',
      context: path.join(process.cwd(), './src'),
      publicPath: '/static/',
      outputPath: 'fonts/'
    }
  }),
  factor.imageLoader({
    exclude: PATHS.nodeModules,
    include: PATHS.src,
    options: {
      name: '[name].[ext]',
      context: path.join(process.cwd(), './src'),
      publicPath: '/static/',
      outputPath: 'images/'
    }
  }),
  factor.uglifyJavaScript({
    sourceMap: false,
    uglifyOptions: {
      compress: {
        ecma: 8,
        keep_fnames: true,
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: false
      },
      mangle: {
        keep_fnames: true
      },
      output: {
        comments: false
      }
    }
  }),
  new webpack.optimize.DedupePlugin(),
  factor.purifyCSS({
    paths: glob.sync(`${PATHS.src}/**/**/**/*.js`, { nodir: true })
  }),
  factor.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      safe: true
    }
  }),
  factor.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/)
    },
    {
      name: 'manifest',
      minChunks: Infinity
    }
  ])
]);

// Webpack Config
module.exports = env => {
  process.env.BABEL_ENV = env;

  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
