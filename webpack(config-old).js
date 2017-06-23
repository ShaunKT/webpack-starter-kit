// NOTES
// To run eslinter you need to start the server and then run linter
// (`npm run development` while it is running `npm start`) or just run (`npm run lint:js`)
const path = require("path");
const glob = require("glob");
const merge = require("webpack-merge");
const HappyPack = require("happypack");
const nodeExternals = require("webpack-node-externals");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

const assets_config = require("./webpack_configs/webpack.assets.config");
const js_config = require("./webpack_configs/webpack.javascript.config");
const styles_config = require("./webpack_configs/webpack.styles.config");
const dev_server = require("./webpack_configs/webpack.server.config");
const ssr = require("./webpack_configs/webpack.ssr");

// === Directory Paths === //
const PATHS = {
  app: path.resolve(__dirname, "src"),
  build: path.resolve(__dirname, "build"),
  styles: path.resolve(__dirname, "src/styles")
};

// === Entry Config === //
const developmentEntryConfig = merge([
  {
    entry: {
      app: [
        "babel-polyfill",
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:3030",
        "webpack/hot/only-dev-server",
        path.join(__dirname, "src")
      ]
    },
    output: {
      publicPath: "/"
    }
  }
]);

const productionEntryConfig = merge([
  {
    entry: {
      app: path.resolve(__dirname, "src")
    },
    output: {
      publicPath: "./"
    }
  }
]);

// === Common Config === //
const commonConfig = merge([
  {
    output: {
      path: PATHS.build,
      filename: "[name].[hash].js"
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    plugins: [
      new HappyPack({
        loaders: ["react-hot-loader/webpack", "babel-loader"]
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        title: "Webpack starter",
        template: "./src/templates/index.pug",
        hash: true,
        minify: {
          collapseWhitespace: true,
          removeComments: true
        }
      }),
      new StyleLintPlugin({
        configFile: "./stylelint.config.js"
      })
    ]
  },
  js_config.loadPUG(),
  js_config.loadJavaScript({
    include: PATHS.app,
    exclude: /node_modules/
  }),
  // assets_config.imageFileLoader(),
  assets_config.loadFonts({
    options: {
      name: "./fonts/[name].[hash:8].[ext]"
    }
  })
]);

// === Development Config === //
const developmentConfig = merge([
  styles_config.lintCSS({
    include: PATHS.styles
  }),
  js_config.lintJavaScript({
    include: PATHS.app
  }),
  styles_config.loadCSS({
    include: PATHS.styles
  }),
  assets_config.loadImages(),
  dev_server.devServer({
    host: process.env.HOST,
    port: 3030
  })
]);

// === Staging Config === //
const stagingConfig = merge([
  js_config.minifyJavaScript(),
  styles_config.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      safe: true
    }
  }),
  styles_config.extractCSS({
    include: PATHS.styles,
    use: [
      {
        loader: "css-loader",
        options: {
          modules: true,
          importLoaders: 2
        }
      },
      styles_config.autoprefix(),
      "sass-loader"
    ]
  }),
  styles_config.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  }),
  assets_config.loadImages({
    options: {
      limit: 10000,
      name: "./images/[name].[hash:8].[ext]"
    }
  }),
  dev_server.generateSourceMaps({
    type: "source-map"
  })
]);

// === Production Config === //
const productionConfig = merge([
  js_config.minifyJavaScript(),
  js_config.moduleReplacement(/\/syncRouteBundle.js/, "./asyncRouteBundle.js"),
  styles_config.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      },
      safe: true
    }
  }),
  styles_config.extractCSS({
    include: PATHS.styles,
    use: [
      {
        loader: "css-loader",
        options: {
          modules: true,
          importLoaders: 2
        }
      },
      styles_config.autoprefix(),
      "sass-loader"
    ]
  }),
  styles_config.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  }),
  assets_config.loadImages({
    options: {
      limit: 10000,
      name: "./images/[name].[hash:8].[ext]"
    }
  })
]);

// Webpack Config
module.exports = env => {
  process.env.BABEL_ENV = env;

  if (env === "production") {
    return merge(productionEntryConfig, commonConfig, productionConfig), ssr;
  }

  if (env === "staging") {
    return merge(productionEntryConfig, commonConfig, stagingConfig);
  }

  return merge(developmentEntryConfig, commonConfig, developmentConfig);
};
