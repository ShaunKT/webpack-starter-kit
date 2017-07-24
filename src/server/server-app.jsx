// @flow

// React
import React from 'react'
import ReactDOMServer from 'react-dom/server'

// Helmet - Inject info into the head elements
import Helmet from 'react-helmet'

// React Router
import { StaticRouter } from 'react-router'

//  Redux
import { Provider } from 'react-redux'

// Elements
import initStore from './server-store';
import App from '../client/client-app';

// Shared Configs
import { inProduction, WDS_PORT } from '../config/env.config';

const renderApp = (location: string, plainPartialState: ?Object, routerContext: ?Object = {}) => {
  const store = initStore(plainPartialState)
  const appHtml = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={routerContext}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const headContent = Helmet.rewind();

  return (
    `<!doctype html>
    <html>
      <head>
        ${headContent.title}
        ${headContent.meta}
        <link rel="stylesheet" type="text/css" href="${inProduction ? '/static/' : `http://localhost:${WDS_PORT}/`}stylesheet/styles.css">
      </head>
      <body>
        <main id="mount-app">${appHtml}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
        </script>
        <script src="${inProduction ? '/static/' : `http://localhost:${WDS_PORT}/`}js/manifest.js"></script>
        <script src="${inProduction ? '/static/' : `http://localhost:${WDS_PORT}/`}js/vendor.js"></script>
        <script src="${inProduction ? '/static/' : `http://localhost:${WDS_PORT}/`}js/bundle.js"></script>
      </body>
    </html>`
  );
}

export default renderApp;
