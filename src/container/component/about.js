import React from 'react';

import HeaderContainer from '../header/header';
import NavContainer from '../navigation/nav';
import FooterContainer from '../footer/footer';

export default function About() {
  return (
    <article>
      <HeaderContainer />
      <NavContainer />
      <h3>
        About Us
      </h3>
      <p>
        Information about the article
      </p>
      <FooterContainer />
    </article>
  );
}
