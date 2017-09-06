// Libs
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import _ from 'lodash';

// Configuration
import config from '../config';

// Routes
import routes from '../routes/routes';

export default () => {
  // Use it when sub routes are added to any route it'll work
  const routeWithSubRoutes = route => (
    <Route
      key={_.uniqueId()}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        // Pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes || null} />
      )}
    />
  );

  return (
    <div>
      <Helmet {...config.app} />
      <div>
        <img src={require('../images/logo.jpg')} alt="Logo" role="presentation" />
        <h1>{config.app.title} ajshkajsdhasjh</h1>
        <p>This is a NEW TEST FOR THE BEST</p>
        <img src={require('../images/image-placeholder.jpg')} alt="Placeholder" />
      </div>
      <hr />
      <Switch>{routes.map(route => routeWithSubRoutes(route))}</Switch>
    </div>
  );
};
