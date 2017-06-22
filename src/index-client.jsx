import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app.jsx';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';

// import { AppContainer } from 'react-hot-loader';
// import AppRouter from './routes/appRouter';

// require('./styles/index.scss');

// const render = (Component) => {
//   ReactDOM.render(
//     <BrowserRouter>
//       <AppContainer>
//         <Component />
//       </AppContainer>
//     </BrowserRouter>,
//     document.getElementById('root'),
//   );
// };

// render(AppRouter);

// if (module.hot) {
//   module.hot.accept(
//     './routes/appRouter', () => { render(AppRouter); },
//   );
// }
