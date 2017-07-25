// Webpack Module Configs
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

// == Javascript == //
// Javascript Linter
exports.lintJavaScript = ({
  include, exclude, options,
  }) => ({
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
exports.loadJavaScript = ({
  include, exclude,
  }) => ({
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
exports.minifyJavaScript = () => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourceMap: false,
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
exports.loadCSS = ({
  include, exclude
  } = {}) => ({
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

// Extract CSS to extrenal file "stylesheets/styles.css"
exports.extractCSS = ({ include, exclude }) => {
  const plugin = new ExtractTextPlugin({
    filename: 'stylesheet/styles.css'
  });

  return {
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          include,
          exclude,

          use: plugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1
                }
              },
              'postcss-loader',
              'sass-loader'
            ],
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [plugin]
  };
};

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

// Image Loader
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        include,
        exclude,

        use: [
          {
            loader: 'url-loader',
            options,
          },
          'image-webpack-loader'
        ]
      }
    ]
  }
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

// Webpack Dev Server
exports.devServer = ({
  host, port,
  } = {}) => ({
    devServer: {
      historyApiFallback: true,
      stats: 'errors-only',
      hotOnly: true,
      hot: true,
      contentBase: path.resolve(__dirname, '../dist'),
      inline: true,
      host,
      port,
      overlay: {
        warnings: false,
        errors: true
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  });