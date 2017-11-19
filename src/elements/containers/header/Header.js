// React
import React from 'react';

// Elements
import { Logo } from '../../components/index';
import Navigation from '../navigation/navigation';

const Header = () => (
  <header className="header__container">
    <Logo />
    <Navigation />
  </header>
);

export default Header;
