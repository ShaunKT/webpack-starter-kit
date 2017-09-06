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
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

// Bundle Splitting
exports.extractBundles = bundles => ({
  plugins: bundles.map(bundle => new webpack.optimize.CommonsChunkPlugin(bundle)),
});

// Minify JavaSscript Loader
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

// == Styles == //
// SASS, Autoprefixer
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        include,
        exclude,
        use: 'happypack/loader?id=styles',
      },
    ],
  },
});

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

// == Assets == //
// Url Loaders
exports.urlLoader = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        include,
        exclude,

        use: [
          {
            loader: 'url-loader',
            options,
          },
          'image-webpack-loader',
        ],
      },
    ],
  },
});

// File Loaders
exports.fileLoader = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        include,
        exclude,
        use: [
          {
            loader: 'file-loader',
            options,
          },
          {
            loader: 'image-webpack-loader',
            options: { bypassOnDebug: true },
          },
        ],
      },
    ],
  },
});

// == Environment Variables == //
// Setting process.env
exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [new webpack.DefinePlugin(env)],
  };
};

// == Servers == //
// Webpack Dev Server
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    hotOnly: true,
    hot: true,
    contentBase: path.resolve(__dirname, '../build'),
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
