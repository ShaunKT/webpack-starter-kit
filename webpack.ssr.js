const path = require('path');
const merge = require('webpack-merge');

const js_config = require('./webpack_configs/webpack.javascript.config');
const HappyPack = require('happypack');

const PATHS = {
  build: path.join(__dirname, 'static'),
  ssr: path.join(__dirname, './src', './ssr.js'),
};

module.exports = merge([
  {
    entry: {
      index: PATHS.ssr,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
      libraryTarget: 'umd',
    },
    plugins: [
        new HappyPack({
            loaders: [
                'babel-loader',
            ],
        }),
    ],
  },
  js_config.loadJavaScript({ include: PATHS.ssrDemo }),
]);
