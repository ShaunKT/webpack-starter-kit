import React from 'react';

import HeaderContainer from '../header/header';
import NavContainer from '../navigation/nav';
import FooterContainer from '../footer/footer';

export default function Home() {
  return (
    <article>
      <HeaderContainer />
      <NavContainer />
        <h3>
          Home
        </h3>
        <p>
          Welcome about the article
        </p>
      <FooterContainer />
    </article>
  );
}
