import React from 'react';

const HomePage = () => {
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
      <h3>Welcome to SSR</h3>
      <p>Check out the our New Universal App</p>
    </article>
  );
};

export default { component: HomePage };
