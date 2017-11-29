// Babel
import 'babel-polyfill';

// Express
import express from 'express';
import proxy from 'express-http-proxy';

// React Router
import { matchRoutes } from 'react-router-config';

// React Rendered String View
import Html from '../views/react-html';

// Routes
import Routes from '../routes/routes';

// Store
import createStore from '../store/createStore';

// Configs
import {
  inProduction,
  inDevelopment,
  port,
  host
} from '../../src/config/index';

// Create App
const app = express();

app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    }
  })
);
app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore(req);
  const assets = global.assets;
  console.log('assets', assets);

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = Html(req, store, context);

    if (context.url) {
      res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

// Express port and host
if (port) {
  app.listen(port, host, err => {
    const url = `http://${host}:${port}`;
    if (err) console.error(err);
    console.info(
      `Listening on ${url} ${inDevelopment ? '(development)' : '(production)'}`
    );
  });
}
