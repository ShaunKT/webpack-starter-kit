// Webpack Module Configs
const webpack = require('webpack');
const PurifyCSSPlugin = require('purifycss-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // eslint-disable-line
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

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
        options
      }
    ]
  }
});

// Babel Loader
exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,
        use: 'happypack/loader?id=js'
      }
    ]
  }
});

// Minify JavaSscript Loader
exports.minifyJavaScript = ({ sourceMap, compress }) => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      mangle: true,
      sourceMap,
      compress
    })
  ]
});

// Bundle Splitting
exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  ))
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
        use: 'happypack/loader?id=styles'
      }
    ]
  }
});


// Remove unused css classes
exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({
      paths,
      minimize: true
    })
  ]
});

// Minify Styles
exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: true
    })
  ]
});

// == Environment Variables == //
// Setting process.env
exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};

// == Server == //
// Source Maps
exports.generateSourceMaps = ({ type }) => ({
  devtool: type
});
