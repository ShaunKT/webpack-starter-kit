// React
import React from 'react';

// Helmet
import Helmet from 'react-helmet';

// Elements
import { ErrorMsg } from '../../components/index';

const NotFoundPage = () => {
  return [
    <Helmet
      key="helmet_notFoundPage"
      title="Page not found - 404 Error Page"
    />,
    <h1 key="h1_notFoundPage">Page not found - 404 Error</h1>,
    <article key="article_notFoundPage">
      <ErrorMsg />
    </article>
  ];
};

export default {
  component: NotFoundPage
};
