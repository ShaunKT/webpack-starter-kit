/* @flow */

// Redux
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

// Libs
import thunk from 'redux-thunk';
import axios from 'axios';

// Elements
import rootReducer from '../reducers/reducers';

export default (history, initialState = {}) => {
  const middlewares = [
    thunk.withExtraArgument(axios),
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    __DEV__ && typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
      window.devToolsExtension() : f => f,
  ];

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/reducers', () => {
      try {
        const nextReducer = require('../reducers/reducers').default;

        store.replaceReducer(nextReducer);
      } catch (error) {
        console.error(`Reducer hot reloading error ${error}`);
      }
    });
  }

  return store;
};
