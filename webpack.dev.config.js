const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');

// Happy Pack Thread
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

// Style Plugins
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// Webpack Config
exports.developmentConfig = () => ({
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    publicPath: 'http://localhost:3030/'
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
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer()]
          }
        },
        'sass-loader'
      ]
    }),
    new StyleLintPlugin({
      configFile: './stylelint.config.js',
      syntax: 'scss'
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
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
        loaders: 'happypack/loader?id=styles',
        include: [
          path.resolve(__dirname, 'src/styles'),
          path.resolve(__dirname, './node_modules/purecss/build/')
        ],
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
    ],
  },
  devServer: {
    port: 3030,
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    stats: 'errors-only',
    historyApiFallback: true,
    inline: true,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  devtool: 'eval-source-map'
});
