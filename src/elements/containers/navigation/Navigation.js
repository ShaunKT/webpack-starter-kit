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
          label: 'Landing Page'
        },
        {
          route: '/404',
          label: '404 Page'
        }
      ].map(link => (
        <li key={link.route} className="header-nav__tab">
          <NavLink exact to={link.route} activeClassName="active">
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
