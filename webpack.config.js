const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HappyPack = require('happypack');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Happy Pack Thread
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

// Env Target
const inProduction = process.env.NODE_ENV === 'production';

// Webpack Modules
const parts = require('./webpack_configs/webpack.modules');

// Directory Paths
const PATHS = {
  app: path.join(__dirname, 'src'),
  server: path.join(__dirname, 'src/server/'),
  styles: path.join(__dirname, './src/styles/'),
  views: path.resolve(__dirname, './src/views'),
  public: inProduction ? '/static/' : 'http://localhost:8080/',
  dist: path.join(__dirname, 'dist')
};

// Common Webpack Configuration
const commonConfig = merge([
  {
    entry: {
      bundle: PATHS.app
    },
    output: {
      path: PATHS.dist,
      filename: 'js/[name].js',
      publicPath: PATHS.public,
      chunkFilename: 'js/[name].js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.scss', '.css']
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        title: 'Webpack Starter Kit',
        template: './src/views/index.ejs'
      }),
      new HappyPack({
        id: 'js',
        threadPool: happyThreadPool,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
      }),
    ],
  },
  parts.loadJavaScript({
    include: PATHS.app,
    exclude: /node_modules/
  })
]);

// Development Webpack Config
const developmentConfig = merge([
  {
    entry: {
      hmr: [
        'react-hot-loader/patch',
        'babel-polyfill',
        "webpack-dev-server/client?http://localhost:8080"
      ]
    },
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
    },
    plugins: [
      new StyleLintPlugin({
        configFile: './stylelint.config.js',
        syntax: 'scss'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        title: 'Webpack Starter Kit',
        template: './src/views/index.ejs'
      }),
      new HappyPack({
        id: 'styles',
        threadPool: happyThreadPool,
        loaders: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      })
    ]
  },
  parts.lintJavaScript({
    include: PATHS.app,
    exclude: PATHS.styles,
    options: {
      emitWarning: true,
      emitError: true
    }
  }),
  parts.loadCSS({
    include: [
      PATHS.styles
    ],
    exclude: /node_modules/
  }),
  parts.loadImages({
    exclude: /node_modules/
  }),
  parts.generateSourceMaps({
    type: 'cheap-module-eval-source-map'
  }),
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  })
]);

// Staging Webpack Config
const stagingConfig = merge([
  {
    recordsPath: path.join(__dirname, 'records.json'),
    output: {
      chunkFilename: 'js/[name].js',
      filename: 'js/[name].js'
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin()
    ]
  },
  parts.extractBundles([
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
  parts.extractCSS({
    include: PATHS.styles,
    exclude: /node_modules/
  }),
  parts.loadImages({
    exclude: /node_modules/,
    options: {
      limit: 10000,
      name: 'images/[name].[hash:8].[ext]'
    }
  }),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: false
      },
      safe: true
    }
  }),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
  parts.generateSourceMaps({
    type: 'source-map'
  })
]);

// Production Webpack Config
const productionConfig = merge([
  {
    recordsPath: path.join(__dirname, 'records.json'),
    plugins: [
      new webpack.HashedModuleIdsPlugin()
    ]
  },
  parts.extractBundles([
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
  parts.extractCSS({
    include: PATHS.app
  }),
  parts.loadImages({
    exclude: /node_modules/,
    options: {
      limit: 10000,
      name: 'images/[name].[hash:8].[ext]'
    }
  }),
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: false
      },
      safe: true
    }
  }),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
  parts.generateSourceMaps({
    type: false
  })
]);

// Webpack Config
module.exports = (env) => {
  process.env.BABEL_ENV = env;

  if (env === 'staging') {
    return merge(commonConfig, stagingConfig);
  }

  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
