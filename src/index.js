import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/app';
import { AppContainer } from 'react-hot-loader';

import './styles/main.scss';
import 'purecss';

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app-root')
);

if (module.hot) {
  module.hot.accept();
}
