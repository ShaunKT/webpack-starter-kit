// @flow
// React
import React from 'react';

// Helmet
import Helmet from 'react-helmet'

const LandingPage = () => (
  <article>
    <Helmet
      meta={[
        { name: 'description', content: 'Welcome to the react' },
        { property: 'og:title', content: 'Landing Page' }
      ]}
    />

    <p>Landing Page</p>
  </article>
);

export default LandingPage;
