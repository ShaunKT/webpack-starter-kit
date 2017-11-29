// Babel
import 'babel-polyfill';

// React
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

// React Router
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

// Axios
import axios from 'axios';

// Redux | Thunk
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

// Routes
import Routes from './routes/routes';

// Reducers
import reducers from './reducers/index';

import Styles from './styles/main.scss';

// Create a custome axios instance
const axiosInstance = axios.create({
  baseURL: '/api'
});

// Create Store
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

// Hydrate App

const renderApp = Route => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <div>{renderRoutes(Route)}</div>
      </BrowserRouter>
    </Provider>,
    document.querySelector('#react-root')
  );
};

renderApp(Routes);

// Enable hot reload by react-hot-loader
if (module.hot) {
  module.hot.accept('./routes/routes', () => {
    renderApp(Routes);
  });
}
