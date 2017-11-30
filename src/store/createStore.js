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
