// Webpack modules
const webpack = require('webpack');

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
