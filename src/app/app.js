// React
import React from 'react';

// React Router
import { Route, Switch } from 'react-router-dom';

// Libs
import Helmet from 'react-helmet';
import _ from 'lodash';

// Routes
import routes from '../routes/routes';

// Elements
import Header from '../elements/containers/header/header';
import Footer from '../elements/containers/footer/footer';

export default () => {
  const routeWithSubRoutes = route => (
    <Route
      key={_.uniqueId()}
      exact={route.exact || false}
      path={route.path}
      render={props => <route.component {...props} routes={route.routes || null} />}
    />
  );

  return [
      <Helmet titleTemplate="Webpack Starter Kit - %s" >
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" href={require('../assets/favicons/icon.png')} />
        <title>Lunar</title>
      </Helmet>,
      <Header />,
      <main>
      <Switch>{routes.map(route => routeWithSubRoutes(route))}</Switch>
      </main>,
      <Footer />
  ];
};
