import { combineReducers } from 'redux';
import userReducer from './usersReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';

export { default as counter } from '../actions/counter';

export default combineReducers({
	users: userReducer,
	auth: authReducer,
	admins: adminsReducer
});
