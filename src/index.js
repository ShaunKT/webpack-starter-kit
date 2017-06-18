// LIBS
import React from 'react';
import ReactDOM from 'react-dom';

import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';

//Styles
import './styles/index.scss';

//Pages
import  Main from './components/component';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Main);

if (module.hot) {
  module.hot.accept('./components/component', () => { render(Main); });
}