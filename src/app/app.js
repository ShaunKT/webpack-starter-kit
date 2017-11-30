// React
import React, { Fragment } from 'react';

// React Router
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

// Libs
import Helmet from 'react-helmet';

// Routes
import Routes from '../routes/routes';

// Elements
import Header from '../elements/containers/header/Header';
import Footer from '../elements/containers/footer/Footer';

export default () => (
	<Fragment>
		<Helmet titleTemplate="Webpack Starter Kit - %s">
			<meta charSet="utf-8" />
			<meta httpEquiv="x-ua-compatible" content="ie=edge" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no"
			/>
			<link rel="icon" href={require('../assets/favicons/icon.png')} />
			<title>Webpack</title>
		</Helmet>
		<Header />
		<main>
			<Switch>{renderRoutes(Routes)}</Switch>
		</main>
		<Footer />
	</Fragment>
);
