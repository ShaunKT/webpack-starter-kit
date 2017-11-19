// React
import React from 'react';

import App from '../app/app';
import { HomePage, NotFoundPage, UsersPage } from '../elements/pages/index';

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
        path: '*',
        ...NotFoundPage
      }
    ]
  }
];
