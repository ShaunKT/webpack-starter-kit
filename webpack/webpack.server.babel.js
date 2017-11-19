// Libs
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HappyPack = require('happypack');

// Webpack Plugins
const nodeExternals = require('webpack-node-externals');
const AssetsByTypePlugin = require('webpack-assets-by-type-plugin');

// Happy Pack Thread
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

// Configuration
const factor = require('./webpack.modules.config');

// Directory Paths
const PATHS = {
  src: path.join(process.cwd(), './src'),
  server: path.join(process.cwd(), './src/server/server.js'),
  build: path.join(process.cwd(), './build/'),
  nodeModules: /node_modules/
};

// Common Configuration
const commonConfig = merge([
  {
    name: 'server',
    target: 'node',
    resolve: {
      modules: ['src', 'node_modules'],
      descriptionFiles: ['package.json'],
      extensions: ['.js', '.jsx', '.json', '.scss', '.css']
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.BannerPlugin({
        banner: 'global.assets = require("./assets.json");',
        raw: true
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new HappyPack({
        id: 'scripts',
        threadPool: happyThreadPool,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true
            }
          }
        ]
      })
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: PATHS.nodeModules,
          include: PATHS.src,
          use: 'happypack/loader?id=scripts'
        }
      ]
    },
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: true,
      __dirname: true
    }
  }
]);

// Server Configuration
const serverConfig = merge([
  {
    cache: true,
    devtool: 'hidden-source-map',
    context: path.join(process.cwd()),
    externals: [
      nodeExternals({
        whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i]
      })
    ],
    entry: { server: PATHS.server },
    output: {
      path: PATHS.build,
      chunkFilename: '[name]_[chunkhash].js',
      filename: '[name].js',
      libraryTarget: 'commonjs2',
      publicPath: '/static/'
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          minimize: true
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
    module: {
      rules: [
        {
          test: /\.(css|scss|sass)$/,
          use: [
            {
              loader: 'css-loader/locals',
              options: {
                modules: true,
                root: PATHS.src,
                importLoaders: 1,
                context: PATHS.src,
                localIdentName: '[hash:base64:5]'
              }
            }
          ]
        }
      ]
    }
  },
  factor.fontLoader({
    exclude: PATHS.nodeModules,
    include: PATHS.src,
    options: {
      name: '[name].[ext]',
      context: path.join(process.cwd(), './src'),
      publicPath: '/static/',
      outputPath: 'fonts/',
      emitFile: false
    }
  }),
  factor.imageLoader({
    exclude: PATHS.nodeModules,
    include: PATHS.src,
    options: {
      name: '[name].[ext]',
      context: path.join(process.cwd(), './src'),
      publicPath: '/static/',
      outputPath: 'images/',
      emitFile: false
    }
  }),
  factor.uglifyJavaScript()
]);

// Webpack Config
module.exports = () => {
  return merge(commonConfig, serverConfig);
};
