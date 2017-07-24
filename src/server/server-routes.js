// @flow

import {
  landingPage,
  helloPage,
  dashboardPage,
  contactPage,
} from './server-controller';

import {
  LANDING_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  DASHBOARD_PAGE_ROUTE,
  CONTACT_PAGE_ROUTE
} from '../routes/routes';

import renderApp from './server-app';

export default (app: Object) => {
  app.get(LANDING_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, landingPage()))
  });

  app.get(HELLO_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, helloPage()))
  });

  app.get(DASHBOARD_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, dashboardPage()))
  });

  app.get(CONTACT_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, contactPage()))
  });

  app.get('/500', () => {
    throw Error('Fake Internal Server Error')
  });

  app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url))
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
  });
}