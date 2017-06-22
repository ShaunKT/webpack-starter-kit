// NOTES
// To run eslinter you need to start the server and then run linter
// (`npm run development` while it is running `npm start`) or just run (`npm run lint:js`)
// const path = require('path');
// const glob = require('glob');
// const merge = require('webpack-merge');
// const HappyPack = require('happypack');
// const nodeExternals = require('webpack-node-externals');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const StyleLintPlugin = require('stylelint-webpack-plugin');

// const assets_config = require('./webpack_configs/webpack.assets.config');
// const js_config = require('./webpack_configs/webpack.javascript.config');
// const styles_config = require('./webpack_configs/webpack.styles.config');
// const dev_server = require('./webpack_configs/webpack.server.config');
// const ssr = require('./webpack_configs/webpack.ssr');
const ssr = require('./webpack_configs/webpack.ssr.config');
const development = require('./webpack_configs/webpack.development.config');

// === Directory Paths === //
// const PATHS = {
//   app: path.resolve(__dirname, 'src'),
//   build: path.resolve(__dirname, 'build'),
//   styles: path.resolve(__dirname, 'src/styles'),
// };

// Webpack Config
module.exports = env => {
  process.env.BABEL_ENV = env;

  if (env === 'production') {
    return ssr.ssrConfig();
  }

  return development.developmentConfig();
};
