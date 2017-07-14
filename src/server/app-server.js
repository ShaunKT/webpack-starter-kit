// Shared Configs
import { inProduction, WDS_PORT } from '../config/env.config';

const renderSsrApp = title =>

  `<!doctype html>
  <html>
    <head>
    <title>${title}</title>
    <link rel="stylesheet" type="text/css" href="${inProduction ? '/static/' : `http://localhost:${WDS_PORT}/`}stylesheets/styles.css">
    </head>
    <body>
      <main id="app-root">
         <h1>${markup}</h1>
      </main>
      <script src="${inProduction ? '/static/' : `http://localhost:${WDS_PORT}/`}js/bundle.js"></script>
    </body>
  </html>`;

export default renderSsrApp;
