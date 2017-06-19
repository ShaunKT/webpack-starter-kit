// Webpack modules
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// ======== HTML ======== //
// Pug Loader
exports.loadPUG = () => ({
  module: {
    rules: [
      {
        test: /\.pug$/,
        loaders: ['html-loader', 'pug-html-loader'],
      },
    ],
  },
});

exports.loadHTML = ({ options }) => ({
  plugins: [
    new HtmlWebpackPlugin({
      options
    }),
  ],
});

// ======== JAVASCRIPT ======== //

// ES Linter
exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

// Babel 
exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,

        loader: 'happypack/loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
});

// Minifying JavaScript
exports.minifyJavaScript = () => ({
  plugins: [
    new UglifyJSPlugin(),
  ],
});