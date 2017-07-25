import path from 'path';
import webpack from 'webpack';
import express from 'express';
import compression from 'compression';

// Webpack Middleware
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Shared Configs
import { PORT, inProduction } from '../config/env.config';

// Elements
// import renderApp from './server-app';
import appRoute from '../routes/server-routes/server-routes';

const config = require('../../webpack.config');

const compiler = webpack(config());

const app = express();

app.use(compression());

if (!inProduction) {
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config().output.publicPath,
      stats: {
        colors: true,
        timings: true
      }
    })
  );

  app.use(webpackHotMiddleware(compiler));
}

app.use('/static/', express.static('dist'));

appRoute(app);

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at http://localhost:${PORT}/`);
});
