const express = require('express');
const path = require('path');
const webpack = require('webpack');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const config = require('../../webpack_configs/webpack.development.config');
const compiler = webpack(config);

const app = express();
const PORT = process.env.PORT || 3030;

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/static/',
  }),
);

app.use(
  webpackHotMiddleware(
    compiler.compilers.find(compiler => compiler.name === 'client'),
  ),
);

app.use(webpackHotServerMiddleware(compiler));

app.listen(PORT);
console.log(`Listerning on http://localhost:${PORT}`);
