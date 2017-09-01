// Webpack Module Configuration

// Libs
const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');

// Webpack Plugins
const PurifyCSSPlugin = require('purifycss-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// == Javascript == //
// Javascript Linter
exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        include,
        exclude,
        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

// Minify JavaSscript Loader
// exports.minifyJavaScript = ({ mangle, sourceMap, compress }) => ({
//   plugins: [
//     new webpack.optimize.UglifyJSPlugin({
//       minimize: true,
//       mangle,
//       sourceMap,
//       compress,
//     }),
//   ],
// });

// Minify JavaSscript
exports.uglifyJavaScript = ({ uglifyOptions, sourceMap }) => ({
  plugins: [
    new UglifyJSPlugin({
      parallel: {
        cache: true,
        workers: 2,
      },
      sourceMap,
      uglifyOptions,
    }),
  ],
});

// Bundle Splitting
exports.extractBundles = bundles => ({
  plugins: bundles.map(bundle => new webpack.optimize.CommonsChunkPlugin(bundle)),
});

// == Styles == //
// Remove unused css classes
exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({
      paths,
      minimize: true,
    }),
  ],
});

// Minify Styles
exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: true,
    }),
  ],
});

// Webpack Dev Server
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    hotOnly: true,
    hot: true,
    contentBase: path.join(process.cwd(), './build/'),
    inline: true,
    host,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
