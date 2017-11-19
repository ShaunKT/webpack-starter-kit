import React from 'react';

import { renderRoutes } from 'react-router-config';

import Header from '../elements/containers/header/Header';

import { fetchCurrentUser } from '../actions/usersAction';

const App = ({ route }) => {
  return [
    <Header key="header" />,
    <div key={route.routes}>{renderRoutes(route.routes)}</div>
  ];
};

export default {
  component: App,
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
};
