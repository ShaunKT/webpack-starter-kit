import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import AppRouter from './components/app';

const root = document.getElementById('app');

ReactDOM.render(
  <AppContainer>
    <AppRouter />
  </AppContainer>
  , root);

if (module.hot) {
  module.hot.accept('./components/app', () => {
    ReactDOM.render(
      <AppContainer>
        <AppRouter />
      </AppContainer>
    , root);
  });
}
