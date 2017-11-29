// React
import React from 'react';

// React Router
import { NavLink } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Components
import { Logo } from '../../components/index';

const Header = ({ auth }) => {
  const authButton = auth ? (
    <a href="/api/logout">Logout</a>
  ) : (
    <a href="/api/auth/google">Login</a>
  );

  return (
    <nav className="nav-wrapper">
      <NavLink className="brand-logo left" to="/">
        Home
      </NavLink>
      <ul className="right">
        <li>
          <NavLink className="nav-wrapper" to="/users">
            Run
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-wrapper" to="/admins">
            Admins
          </NavLink>
        </li>
        <li>{authButton}</li>
      </ul>
    </nav>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
