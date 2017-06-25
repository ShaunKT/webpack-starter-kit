// NOTES
// To run eslinter you need to start the server and then run the linter
// (`npm run development` while it is running `npm start`) or just run (`npm run lint:js`)
const ssr = require("./webpack_configs/webpack.ssr.config");
const development = require("./webpack_configs/webpack.development.config");
const production = require("./webpack_configs/webpack.production.config");

// Webpack Config
module.exports = env => {
  process.env.BABEL_ENV = env;

  if (env === "production") {
    return production.productionConfig();
  }

  if (env === "ssr") {
    return ssr.ssrConfig();
  }

  return development.developmentConfig();
};
