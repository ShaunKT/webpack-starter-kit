// @flow

// Shared Configs
import { inProduction, WDS_PORT } from '../../config/env.config';

const renderApp = title =>

  `<!doctype html>
  <html>
    <head>
    <title>${title}</title>
    <link rel="stylesheet" type="text/css" href="${inProduction ? '/static/' : `http://localhost:${WDS_PORT}/`}stylesheet/styles.css">
    </head>
    <body>
      <main id="mount-app"></main>
      <script src="${inProduction ? '/static/' : `http://localhost:${WDS_PORT}/`}js/manifest.js"></script>
      <script src="${inProduction ? '/static/' : `http://localhost:${WDS_PORT}/`}js/vendor.js"></script>
      <script src="${inProduction ? '/static/' : `http://localhost:${WDS_PORT}/`}js/bundle.js"></script>
    </body>
  </html>`;

export default renderApp;
