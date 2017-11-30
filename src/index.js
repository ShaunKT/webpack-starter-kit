// React
import React from 'react';
import { hydrate, unmountComponentAtNode } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

// React Router
import { BrowserRouter } from 'react-router-dom';

// Axios
import axios from 'axios';

// Redux | Thunk
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Reducers
import reducers from './reducers/index';

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

// Styles
import styles from './styles/main.scss'; // eslint-disable-line

// Id to mount react in html
const mountNode = document.getElementById('react-view');

const renderApp = () => {
	const App = require('./app/app').default;

	hydrate(
		<AppContainer>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</AppContainer>,
		mountNode
	);
};

// Enable hot reload by react-hot-loader
if (module.hot) {
	module.hot.accept('./app/app', () => {
		setImmediate(() => {
			unmountComponentAtNode(mountNode);
			renderApp();
		});
	});
}

renderApp();
