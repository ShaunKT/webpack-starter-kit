// React
import React from 'react';

// React Router
import { renderRoutes } from 'react-router-config';

// Elements
import Header from '../elements/containers/header/Header';

// Actions
import { fetchCurrentUser } from '../actions/index';

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
