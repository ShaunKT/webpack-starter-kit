/* @flow */

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

// Setup global variables for server
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false; // Disable server side render here
global.__DEV__ = process.env.NODE_ENV !== 'production';

// This should be the same with webpack context
const dirRoot = require('path').join(process.cwd());

// Settings of webpack-isomorphic-tools
global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  require('./webpack/webpackIsomorphicConfig.config'),
).server(dirRoot, () => {
  if (__DEV__) {
    require('./src/server/server');
  } else {
    // $FlowFixMe: server.js will be generated during compiling
    require('./build/server'); // eslint-disable-line import/no-unresolved
  }
});
