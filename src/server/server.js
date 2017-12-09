// Libs
import path from 'path';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
// import serialize from 'serialize-javascript';

// Proxy
import proxy from 'express-http-proxy';

// React Router
import { matchRoutes } from 'react-router-config';

// Todo serverside rendering
// React
// import React from 'react';
// import { renderToString, renderToStaticMarkup } from 'react-dom/server';

// React Router
// import { StaticRouter, matchPath } from 'react-router-dom';
//
// // Redux
// import { Provider } from 'react-redux';

// Store and History
// import createHistory from 'history/createMemoryHistory';
// import configureStore from '../store/store';
import createStore from '../store/createStore';

// Elements
import ReactHTML from '../views/html';
// import ReactHTML from '../views/react-html';
// import App from '../app/app';

// Routes
import Routes from '../routes/routes';

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

// app.get('*', (req, res) => {
// 	const context = {};
// 	const location = req.url;
// 	const history = createHistory();
// 	const store = configureStore(history);
//
// 	const htmlContent = renderToString(
// 		<Provider store={store}>
// 			<StaticRouter location={location} context={context}>
// 				<App />
// 			</StaticRouter>
// 		</Provider>
// 	);
//
// 	const renderApp = (htmlContent, store, res) => {
// 		const html = renderToStaticMarkup(
// 			<ReactHTML
// 				htmlContent={htmlContent}
// 				store={store}
// 				assets={global.assets}
// 			/>
// 		);
// 		res.send(`<!doctype html>${html}`);
// 	};
//
// 	renderApp(htmlContent, store, res);
// });

app.use(
	'/api',
	proxy('http://react-ssr-api.herokuapp.com', {
		proxyReqOptDecorator(opts) {
			opts.headers['x-forwarded-host'] = 'localhost:3000';
			return opts;
		}
	})
);

app.get('*', (req, res) => {
	const store = createStore(req);

	const promises = matchRoutes(Routes, req.url)
		.map(({ route }) => (route.loadData ? route.loadData(store) : null))
		.map(promise => {
			if (promise) {
				return new Promise((resolve, reject) => {
					promise.then(resolve).catch(resolve);
				});
			}
		});

	Promise.all(promises).then(() => {
		const context = {};
		const assets = global.assets;
		const content = ReactHTML(req, store, context, assets);

		if (context.url) {
			res.redirect(301, context.url);
		}

		if (context.notFound) {
			res.status(404);
		}

		res.send(content);
	});
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
