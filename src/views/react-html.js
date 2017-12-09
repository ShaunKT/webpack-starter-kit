import React from 'react';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

// Environment Target
import { inProduction } from '../config';

const ReactHTML = ({ store, assets, htmlContent }) => {
	const head = Helmet.renderStatic();
	const attrs = head.htmlAttributes.toComponent();
	const { lang, ...rest } = attrs || {};

	return (
		<html {...rest} lang={lang || 'en'}>
			<head>
				{head.title.toComponent()}
				{head.base.toComponent()}
				{head.meta.toComponent()}
				{head.link.toComponent()}

				{inProduction &&
					assets.css.map(path => (
						<link rel="stylesheet" type="text/css" key={path} href={path} />
					))}
			</head>
			<body>
				<div
					id="react-view"
					dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html:
							store &&
							`window.__INITIAL_STATE__=${serialize(store.getState())};`
					}}
				/>
				{inProduction ? (
					assets.js.map(path => <script key={path} src={path} />)
				) : (
					<script type="text/javascript" src="http://localhost:3030/main.js" />
				)}
				{head.script.toComponent()}
			</body>
		</html>
	);
};

ReactHTML.defaultProps = { htmlContent: '' };

export default ReactHTML;
