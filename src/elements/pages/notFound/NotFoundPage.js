import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return (
    <article
      style={{
        width: '80%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}
    >
      <h4>Sorry your page was not found</h4>

      <p>
        Would you like to return to: &nbsp;
        <Link to="/">Return Home</Link>
      </p>
    </article>
  );
};

export default {
  component: NotFoundPage
};
