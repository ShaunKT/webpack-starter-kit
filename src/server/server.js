/* @flow */

// Libs
import path from 'path';
import helmet from 'helmet';
import express from 'express';
// import favicon from 'serve-favicon';
import compression from 'compression';

// React
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

// React Router
import { StaticRouter, matchPath } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';

// Store and History
import createHistory from 'history/createMemoryHistory';
import configureStore from '../store/store';

// Elements
import Html from './server-html';
import App from '../client/app';
import routes from '../routes/routes';

// Config
import { port, host } from '../config';

const app = express();

app.use(helmet());
app.use(compression());

// Use morgan for http request debug (only show error)
// app.use(favicon(path.join(process.cwd(), '../images/favicon.ico')));
app.use(express.static(path.join(process.cwd(), './build')));

// Run express as webpack dev server
if (__DEV__) {
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack/webpack.client.babel');

  const compiler = webpack(webpackConfig());

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig().output.publicPath,
    hot: true,
    noInfo: true,
    stats: 'errors-only',
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

// Register server-side rendering middleware
app.get('*', (req, res) => {
  if (__DEV__) webpackIsomorphicTools.refresh();

  const history = createHistory();
  const store = configureStore(history);
  const renderHtml = (store, htmlContent) => { // eslint-disable-line no-shadow
    const html = renderToStaticMarkup(
      <Html store={store} htmlContent={htmlContent} />,
    );

    return `<!doctype html>${html}`;
  };

  // If __DISABLE_SSR__ = Disables server side rendering
  if (__DISABLE_SSR__) {
    res.send(renderHtml(store));
    return;
  }

  // Load data on server-side
  const loadBranchData = () => {
    const promises = [];

    routes.some((route) => {
      const match = matchPath(req.url, route);

      // $FlowFixMe: the params of pre-load actions are dynamic
      if (match && route.loadData) {
        promises.push(
          route.loadData(store.dispatch, match.params),
        );
      }

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
    .catch((err) => {
      res.status(404).send('Not Found');

      console.error(`Routes error: ${err}`);
    });
});

app.listen(port, host, (err) => {
  if (err) {
    console.error(err);
  }

  console.info(`Listening on http://${host}:${port}`);
});
