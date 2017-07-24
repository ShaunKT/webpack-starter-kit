// @flow
/* eslint-disable global-require */
// React
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

// Shared Config
import { inProduction } from './config/env.config';

// React Router
import { BrowserRouter } from 'react-router-dom';

//  Redux
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// Reducers
import helloReducer from './reducers/hello';

// Store
const composeEnhancers = (inProduction ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(combineReducers(
  { hello: helloReducer }),
  composeEnhancers(applyMiddleware(thunkMiddleware)));

//  App Elements
import App from './client/client-app';

// Styles
import './styles/main.scss';


// Root Entry
const rootElement = document.getElementById('mount-app');

const mainApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(mainApp(App, store), rootElement);


// Webpack Hot Reloading with Redux
if (module.hot) {
  module.hot.accept('./client/client-app', () => {
    const NextApp = require('./client/client-app').default;
    ReactDOM.render(mainApp(NextApp, store), rootElement);
  });
}