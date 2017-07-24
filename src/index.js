// @flow
/* eslint-disable global-require */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/app';
import { AppContainer } from 'react-hot-loader';

import { BrowserRouter } from 'react-router-dom';

// Styles
import './styles/main.scss';

// Root Entry
const rootElement = document.getElementById('mount-app');

const mainApp = AppComponent => (
  <BrowserRouter>
    <AppContainer>
      <AppComponent />
    </AppContainer>
  </BrowserRouter>
);

ReactDOM.render(mainApp(App), rootElement);

if (module.hot) {
  module.hot.accept('./client/app', () => {
    const NextApp = require('./client/app').default;
    ReactDOM.render(mainApp(NextApp), rootElement);
  });
}