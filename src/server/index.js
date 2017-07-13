import path from 'path';
import webpack from 'webpack';
import express from 'express';
import compression from 'compression';

// Webpack Middleware
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Shared Configs
import { APP_NAME, PORT } from '../config/env.config';

import renderSsrApp from './app-server';


const config = require('../../webpack.config');

const compiler = webpack(config);

const app = express();

app.use(compression());

app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      timings: true,
    }
  })
);

app.use(webpackHotMiddleware(compiler));

app.use('/static/', express.static('dist'));

app.get('/', (req, res) => {
  res.send(renderSsrApp(APP_NAME));
});

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at http://localhost:${PORT}/`);
});
