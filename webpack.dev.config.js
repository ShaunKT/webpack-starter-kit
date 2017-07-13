const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const autoprefixer = require('autoprefixer');

// Happy Pack Thread
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

// HTML Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Style Plugins
const StyleLintPlugin = require('stylelint-webpack-plugin');

exports.developmentConfig = () => ({
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css']
  },
  plugins: [
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Custom template',
      template: './src/views/index.ejs'
    }),
    new StyleLintPlugin({
      configFile: './stylelint.config.js',
      syntax: 'scss'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
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
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    stats: 'errors-only',
    colors: true,
    compress: true,
    historyApiFallback: true,
    inline: true,
    overlay: {
      warnings: false,
      errors: true
    },
  },
  devtool: false
});
