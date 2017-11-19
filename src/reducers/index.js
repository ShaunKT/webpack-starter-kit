// export { default as counter } from '../actions/counter';

// Redux
import { combineReducers } from 'redux';

// Reducers
import usersReducer from './usersReducer';

export default combineReducers({
  users: usersReducer
});
