import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./app.jsx";

export default function serverRenderer({ clientStats, serverStats }) {
  return (req, res, next) => {
    const css = new Set();
    const context = {
      insertCss: (...styles) =>
        styles.forEach(style => css.add(style._getCss()))
    };
    const markup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    );

    const html = `<!doctype html>
    <html>
      <head>
        <script async src="/client.js"></script>
        <link rel="stylesheet" href="../styles.css" />
      </head>
      <body>
        <div id="root">${markup}</div>
      </body>
    </html>`;

    res.status(200).send(html);
  };
}
