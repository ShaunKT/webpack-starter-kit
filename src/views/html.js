// React
import React from 'react';
import { renderToString } from 'react-dom/server';

// Serialize
import serialize from 'serialize-javascript';

// Helmet
import { Helmet } from 'react-helmet';

// Redux
import { Provider } from 'react-redux';

// React Router
import { StaticRouter } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';

// Environment Target
import { inProduction } from '../config';

// App
import App from '../app/app';

// Routes
// import Routes from '../routes/routes';

// Render app to string
const ReactHTML = (req, store, context, assets) => {
	const content = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={context}>
				<App />
			</StaticRouter>
		</Provider>
	);

	const helmet = Helmet.renderStatic();

	return `
  <html>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
			${inProduction &&
				assets.css.map(path => (
					<link rel="stylesheet" type="text/css" key={path} href={path} />
				))}
    </head>
    <body>
      <div id="react-root">${content}</div>
      <script>
        window.INITIAL_STATE = ${serialize(store.getState())}
      </script>
    </body>
  </html>`;
};

export default ReactHTML;
