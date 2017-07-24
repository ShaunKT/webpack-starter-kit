// @flow

import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

//  Elements
import MainNav from '../elements/navigation/main-navigation';
import LandingPage from '../elements/container/landing';
import DashboardPage from '../elements/container/dashboard';
import ContactPage from '../elements/container/contact';
import NotFoundPage from '../elements/container/notfound';
import {
  LANDING_PAGE_ROUTE,
  DASHBOARD_PAGE_ROUTE,
  CONTACT_PAGE_ROUTE
} from '../routes/routes';

const App = () => (
  <div>
    <h1>Welcome To Webpack and React</h1>
    <MainNav />
    <Switch>
      <Route exact path={LANDING_PAGE_ROUTE} render={() => <LandingPage />} />
      <Route path={DASHBOARD_PAGE_ROUTE} render={() => <DashboardPage />} />
      <Route path={CONTACT_PAGE_ROUTE} render={() => <ContactPage />} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
