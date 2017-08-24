/* @flow */

// React
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

// Redux
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import './styles/main.scss';

// Store and History
import configureStore from './store/store';

const initialState = window.__INITIAL_STATE__;
const history = createHistory();
const store = configureStore(history, initialState);

// Mount App
const mountAppById = document.getElementById('mount-app');

const mainApp = () => {
  const App = require('./client/app.js').default;

  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    mountAppById,
  );
};

// Enable hot reload by react-hot-loader
if (module.hot) {
  const renderMainApp = () => {
    try {
      mainApp();
    } catch (error) {
      console.log(error);
    }
  };

  module.hot.accept('./client/app.js', () => {
    setImmediate(() => {
      unmountComponentAtNode(mountAppById);
      renderMainApp();
    });
  });
}

mainApp();
