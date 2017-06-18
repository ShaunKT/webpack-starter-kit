// Webpack modules
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// ======== HTML ======== //
// Pug Loader
exports.loadHTML = () => ({
  module: {
    rules: [
      {
        test: /\.pug$/,
        loaders: ['html-loader', 'pug-html-loader'],
      },
    ],
  },
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