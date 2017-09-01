import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';

import createHistory from 'history/createMemoryHistory';
import configureStore from '../store/store';
import ReactHTML from '../views/react-html';
import App from '../app/app';
import routes from '../routes/routes';

import { inDevelopment, port, host } from '../../src/config/index';

const app = express();

// Using helmet to secure Express with various HTTP headers
app.use(helmet());
// Compress all requests
app.use(compression());

app.use(favicon(path.join(process.cwd(), './build/favicon.ico')));
app.use(express.static(path.join(process.cwd(), './build')));

// Run express as webpack dev server
if (inDevelopment) {
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack/webpack.client.babel');

  const compiler = webpack(webpackConfig());

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig().output.publicPath,
      hot: true,
      noInfo: true,
      stats: 'errors-only',
    }),
  );

  app.use(require('webpack-hot-middleware')(compiler));
}

// Register server-side rendering middleware
app.get('*', (req, res) => {
  if (inDevelopment) webpackIsomorphicTools.refresh();

  const history = createHistory();
  const store = configureStore(history);
  const renderHtml = (store, htmlContent) => {
    // eslint-disable-line no-shadow
    const html = renderToStaticMarkup(<ReactHTML store={store} htmlContent={htmlContent} />);

    return `<!doctype html>${html}`;
  };

  // If __DISABLE_SSR__ = true, disable server side rendering
  // if (__DISABLE_SSR__) {
  //   res.send(renderHtml(store));
  //   return;
  // }

  // Load data on server-side
  const loadBranchData = () => {
    const promises = [];

    routes.some(route => {
      const match = matchPath(req.url, route);

      // $FlowFixMe: the params of pre-load actions are dynamic
      if (match && route.loadData) promises.push(route.loadData(store.dispatch, match.params));

      return match;
    });

    return Promise.all(promises);
  };

  // Send response after all the action(s) are dispathed
  loadBranchData()
    .then(() => {
      // Setup React-Router server-side rendering
      const routerContext = {};
      const htmlContent = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={routerContext}>
            <App />
          </StaticRouter>
        </Provider>,
      );

      // Check if the render result contains a redirect, if so we need to set
      // the specific status and redirect header and end the response
      if (routerContext.url) {
        res.status(301).setHeader('Location', routerContext.url);
        res.end();

        return;
      }

      // Checking is page is 404
      const status = routerContext.status === '404' ? 404 : 200;

      // Pass the route and initial state into html template
      res.status(status).send(renderHtml(store, htmlContent));
    })
    .catch(err => {
      res.status(404).send('Not Found :(');
      console.error(`Rendering routes error: ${err}`);
    });
});

if (port) {
  app.listen(port, host, err => {
    const url = `http://${host}:${port}`;

    if (err) console.error(err);

    console.info(`Listening on ${url}`);
  });
}
