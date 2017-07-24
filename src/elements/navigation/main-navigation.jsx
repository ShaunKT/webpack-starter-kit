// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LANDING_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  DASHBOARD_PAGE_ROUTE,
  CONTACT_PAGE_ROUTE,
  NOT_FOUND_DEMO_PAGE_ROUTE
} from '../../routes/routes';

const MainNav = () => (
  <nav>
    <ul>
      {[
        { route: LANDING_PAGE_ROUTE, label: 'Landing Page' },
        { route: HELLO_PAGE_ROUTE, label: 'Hello Page' },
        { route: DASHBOARD_PAGE_ROUTE, label: 'Dashboard Page' },
        { route: CONTACT_PAGE_ROUTE, label: 'Contact Page' },
        { route: NOT_FOUND_DEMO_PAGE_ROUTE, label: '404 Page' }
      ].map(link => (
        <li key={link.route}>
          <NavLink to={link.route} activeStyle={{ color: 'limegreen' }} exact>
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default MainNav;
