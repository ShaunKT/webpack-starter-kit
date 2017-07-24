// @flow

import {
  LANDING_PAGE_ROUTE,
  DASHBOARD_PAGE_ROUTE,
  CONTACT_PAGE_ROUTE
} from '../routes/routes';

import renderApp from './server-app';

export default (app: Object) => {
  app.get(LANDING_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, landingPage()));
  });

  app.get(DASHBOARD_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, dashboardPage()));
  });

  app.get(CONTACT_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, contactPage()));
  });

  app.get('/500', () => {
    throw Error('Server Error');
  });

  app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url));
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 error, Something went wrong!');
  });
};
