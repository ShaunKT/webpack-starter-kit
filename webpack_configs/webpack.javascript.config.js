// Webpack modules
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

// ======== HTML ======== //
// Pug Loader
exports.loadPUG = () => ({
  module: {
    rules: [
      {
        test: /\.pug$/,
        loaders: ["html-loader", "pug-html-loader"]
      }
    ]
  }
});

// ======== JAVASCRIPT ======== //

// ES Linter
exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,
        enforce: "pre",
        loader: "eslint-loader",
        options
      }
    ]
  }
});

// Babel
exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,

        loader: "happypack/loader",
        options: {
          cacheDirectory: true
        }
      }
    ]
  }
});

// Minifying JavaScript
exports.minifyJavaScript = () => ({
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
});

// Minifying JavaScript
exports.moduleReplacement = ({ fileOptions }) => ({
  plugins: [new webpack.NormalModuleReplacementPlugin(fileOptions)]
});
