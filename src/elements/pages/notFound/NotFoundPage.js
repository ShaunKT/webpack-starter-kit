// React
import React, { Fragment } from 'react';

// Helmet
import Helmet from 'react-helmet';

// Elements
import { ErrorMessage } from '../../components/index';

const NotFoundPage = () => (
  <Fragment>
    <Helmet title="Page not found - 404 Error Page" />,
    <h1>Page not found - 404 Error</h1>,
    <article>
      <h4>Sorry your page was not found</h4>
      <p>Would you like to return to: &nbsp;</p>
      <ErrorMessage />
    </article>
  </Fragment>
);

export default { component: NotFoundPage };
