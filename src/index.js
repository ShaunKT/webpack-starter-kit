// React
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

// Redux
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

// Store
import configureStore from './store/store';

// Get initial state from server-side rendering
const initialState = window.__INITIAL_STATE__;
const history = createHistory();
const store = configureStore(history, initialState);

// Id to mount react in html
const mountNode = document.getElementById('react-view');

// Styles
import styles from './styles/main.scss';

const renderApp = () => {
  const App = require('./app/app').default;

  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    mountNode
  );
};

// Enable hot reload by react-hot-loader
if (module.hot) {
  module.hot.accept('./app/app', () => {
    setImmediate(() => {
      unmountComponentAtNode(mountNode);
      renderApp();
    });
  });
}

renderApp();
