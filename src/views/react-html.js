// React
import React from 'react';
import { renderToString } from 'react-dom/server';

// Serialize
import serialize from 'serialize-javascript';

// Helmet
import { Helmet } from 'react-helmet';

// Redux
import { Provider } from 'react-redux';

// React Router
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

// Routes
import Routes from '../routes/routes';

// Configs
import {
  inProduction,
  inDevelopment,
  port,
  host
} from '../../src/config/index';

// Render app to string
export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return `
  <html>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
    </head>
    <body>
      <div id="react-root">${content}</div>
      <script>
        window.INITIAL_STATE = ${serialize(store.getState())}
      </script>
    </body>
  </html>`;
};
