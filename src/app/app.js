// React
import React, { Fragment } from 'react';

// React Router
import { Route, Switch } from 'react-router-dom';

// Libs
import Helmet from 'react-helmet';

// Routes
import routes from '../routes/routes';

// Elements
import Header from '../elements/containers/header/Header';
import Footer from '../elements/containers/footer/Footer';

export default () => {
  const routeWithSubRoutes = (route, index) => (
    <Route
      key={route.path + index}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes || null} />
      )}
    />
  );

  return (
    <Fragment>
      <Helmet titleTemplate="Webpack Starter Kit - %s">
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href={require('../assets/favicons/icon.png')} />
        <title>Webpack</title>
      </Helmet>
      <Header />
      <main>
        <Switch>
          {routes.map((route, index) => routeWithSubRoutes(route, index))}
        </Switch>
      </main>
      <Footer />
    </Fragment>
  );
};
