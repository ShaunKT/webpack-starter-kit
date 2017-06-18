// Webpack modules
const webpack = require('webpack');
const cssnano = require('cssnano');
const PurifyCSSPlugin = require('purifycss-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// ======== JAVASCRIPT ======== //
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

// ======== STYLES ======== //

// SASS/CSS Linter
exports.lintCSS = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'postcss-loader',
        options: {
          plugins: () => ([
            require('stylelint')(),
          ]),
        },
      },
    ],
  },
});

// CSS Loader
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        include,
        exclude,

        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
});

// CSS autoprefix
exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer')(),
    ]),
  },
});

// Remove unused css
exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({ paths }),
  ],
});

// Minifying CSS
exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});

// Create an external CSS file
exports.extractCSS = ({ include, exclude, use }) => {
  const plugin = new ExtractTextPlugin({
    filename: '[name].[contenthash:8].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          include,
          exclude,

          use: plugin.extract({
            fallback: 'style-loader',
            use,
          }),
        },
      ],
    },
    plugins: [
      plugin,
    ],
  };
};


// ======== IMAGE LOADERS AND FONTS ======== //

// File and URL loaders
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpeg|jpg|png|gif|svg|ico)$/i,
        include,
        exclude,

        use: [
          'image-webpack-loader',
          {
            loader: 'url-loader',
            options,
          },
        ],
      },
    ],
  },
});

// Font loaders
exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,

        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});


// ======== DEV SERVER ======== //

// Dev Server
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
    compress: true,
    open: true,
    host,
    port,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
});

// ======== SOURCE MAPS ======== //

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});
