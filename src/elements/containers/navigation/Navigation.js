// React
import React from 'react';

// React-Router
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul className="header-nav__container">
      {[
        {
          route: '/',
          label: 'Landing Page',
          key: 'tab_1_navigation'
        },
        {
          route: '/users',
          label: 'users',
          key: 'tab_2_users'
        },
        {
          route: '/404',
          label: '404 Page',
          key: 'tab_5_navigation'
        }
      ].map(link => (
        <li key={link.key} className="header-nav__tab">
          <NavLink exact to={link.route} activeClassName="active">
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
