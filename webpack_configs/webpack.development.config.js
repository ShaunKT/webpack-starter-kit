const path = require("path");
const webpack = require("webpack");
const HappyPack = require("happypack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

const entryPoint = path.resolve(__dirname, "../src/");
const stylesEntryPoint = path.resolve(__dirname, "../src/styles");

exports.developmentConfig = () => ({
  name: "client",
  target: "web",
  entry: {
    client: [
      "babel-polyfill",
      "react-hot-loader/patch",
      "webpack-dev-server/client?http://localhost:3030",
      path.join(__dirname, "../", "src/", "index-client.jsx")
    ]
  },
  output: {
    path: path.join(__dirname, "../dist/"),
    filename: "[name].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(pug|html)$/,
        use: ["html-loader", "pug-html-loader"]
      },
      {
        test: /\.js?x$/,
        exclude: /(node_modules\/)/,
        enforce: "pre",
        use: "eslint-loader"
      },
      {
        test: /\.js?x$/,
        include: entryPoint,
        exclude: /(node_modules\/)/,
        use: [
          {
            loader: "happypack/loader",
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        include: stylesEntryPoint,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")()]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "image-webpack-loader",
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "images/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Webpack starter",
      template: path.resolve(__dirname, "../src/views/index.pug")
    }),
    new HappyPack({
      loaders: ["react-hot-loader/webpack", "babel-loader"]
    }),
    new StyleLintPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // hot: true,
    open: true,
    port: 3030,
    hotOnly: true,
    compress: true,
    stats: "errors-only",
    historyApiFallback: true,
    overlay: {
      errors: true
    }
  }
});

