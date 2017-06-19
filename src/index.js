import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import AppRouter from './routes/appRouter';


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(AppRouter);

if (module.hot) {
  module.hot.accept(
    './routes/appRouter', () => { render(AppRouter); },
  );
}
