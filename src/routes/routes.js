// React
import React from 'react';

// Rendered Components
import App from '../app/app';

// Pages
import {
  HomePage,
  UsersPage,
  AdminsPage,
  NotFoundPage
} from '../elements/pages/index';

export default [
  {
    ...App,
    routes: [
      {
        path: '/',
        exact: true,
        ...HomePage
      },
      {
        path: '/users',
        ...UsersPage
      },
      {
        path: '/admins',
        ...AdminsPage
      },
      {
        path: '*',
        ...NotFoundPage
      }
    ]
  }
];
