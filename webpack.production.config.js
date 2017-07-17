const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HappyPack = require('happypack');
const autoprefixer = require('autoprefixer');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

// Happy Pack Thread
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

// HTML Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Style Plugins
const cssnano = require('cssnano');
const PurifyCSSPlugin = require('purifycss-webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Shared Configs
const inProduction = process.env.NODE_ENV === 'production';

const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Webpack Config
exports.productionConfig = () => ({
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    publicPath: inProduction ? '/static/' : 'http://localhost:3030/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css']
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['react-hot-loader/webpack', 'babel-loader'],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Custom template',
      template: './src/views/index.ejs'
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        safe: true
      },
      canPrint: true
    }),
    new PurifyCSSPlugin({
      verbose: true,
      minimize: true,
      paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*.js`, { nodir: true })
    }),
    new StyleLintPlugin({
      configFile: './stylelint.config.js',
      syntax: 'scss'
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourceMap: true,
      compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true,
        screw_ie8: true,
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
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 2,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new StatsPlugin('stats.json', {
      chunkModules: true,
      modules: true,
      chunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('stylesheets/styles.css')
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: 'happypack/loader?id=js',
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()]
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'image-webpack-loader',
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  devtool: 'eval-source-map'
});