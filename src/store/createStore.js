// Redux
import { createStore, applyMiddleware } from 'redux';

// Axios
import axios from 'axios';

// Thunk
import thunk from 'redux-thunk';

// Reducers
import reducers from '../reducers/index';

export default req => {
  // Create a custome axios instance
  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
    headers: { cookie: req.get('cookie') || '' }
  });

  // Create Store
  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );
  return store;
};

// import { createStore, combineReducers, applyMiddleware } from 'redux';
//
// import {
//   ConnectedRouter,
//   routerReducer,
//   routerMiddleware
// } from 'react-router-redux';
//
// import * as Reducers from '../reducers/index';
//
// export default history => {
//   const middleware = routerMiddleware(history);
//
//   const store = createStore(
//     combineReducers({
//       ...Reducers,
//       router: routerReducer
//     }),
//     applyMiddleware(middleware)
//   );
//
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextReducers = require('../reducers/index.js');
//       const rootReducer = combineReducers({
//         ...nextReducers,
//         router: routerReducer
//       });
//
//       store.replaceReducer(rootReducer);
//     });
//   }
//
//   return store;
// };
