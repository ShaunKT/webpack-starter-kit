// Libs
import path from 'path';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import serialize from 'serialize-javascript';
// Todo serverside rendering
// React
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

// React Router
import { StaticRouter, matchPath } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';

// Store and History
import createHistory from 'history/createMemoryHistory';
import configureStore from '../store/store';

// Elements
import ReactHTML from '../views/react-html';
import App from '../app/app';
import routes from '../routes/routes';

// Configs
import {
	inProduction,
	inDevelopment,
	port,
	host
} from '../../src/config/index';

const app = express();

// Using helmet to secure Express with various HTTP headers
app.use(helmet());
app.use(compression());

// Express for production build
if (inProduction) {
	app.use(express.static(path.join(process.cwd(), './build')));
}

app.get('*', (req, res, next) => {
	const context = {};
	const location = req.url;
	const history = createHistory();
	const store = configureStore(history);

	const htmlContent = renderToString(
		<Provider store={store}>
			<StaticRouter location={location} context={context}>
				<App />
			</StaticRouter>
                                    </Provider>
	);

	const renderApp = (htmlContent, store, res) => {
		const assets = global.assets;
		const html = renderToStaticMarkup(
			<ReactHTML htmlContent={htmlContent} store={store} assets={assets} />
		);
		res.send(`<!doctype html>${html}`);
	};

	renderApp(htmlContent, store, res);
});

// Express port and host
if (port) {
	app.listen(port, host, err => {
		const url = `http://${host}:${port}`;
		if (err) console.error(err);
		console.info(
			`Listening on ${url} ${inDevelopment ? '(development)' : '(production)'}`
		);
	});
}
