// Environment Config
const { productionConfig } = require('./webpack.production.config');
const { stagingConfig } = require('./webpack.dev.config');
const { developmentConfig } = require('./webpack.dev.config');

// Webpack Config
module.exports = env => {
  if (process.env.NODE_ENV === 'production') {
    return productionConfig();
  }

  if (process.env.NODE_ENV === 'staging') {
    return stagingConfig();
  }

  return developmentConfig();
};