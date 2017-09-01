import React from 'react';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

const ReactHTML = ({ store, htmlContent }) => {
  // Should be declared after "renderToStaticMarkup()" of "../server.js" or it won't work
  const head = Helmet.renderStatic();
  const attrs = head.htmlAttributes.toComponent();
  const { lang, ...rest } = attrs || {};

  return (
    <html {...rest} lang={lang || 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {head.title.toComponent()}
        {head.base.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}

        <link href="/static/styles/main.css" rel="stylesheet" type="text/css" />
      </head>
      <body>
        <div
          id="react-view"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
        />

        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: store && `window.__INITIAL_STATE__=${serialize(store.getState())};`,
          }}
        />

        <script type="text/javascript" src="/static/js/manifest.js" />
        <script type="text/javascript" src="/static/js/vendor.js" />
        <script type="text/javascript" src="/static/js/bundle.js" />
        {head.script.toComponent()}
      </body>
    </html>
  );
};

ReactHTML.defaultProps = { htmlContent: '' };

export default ReactHTML;
