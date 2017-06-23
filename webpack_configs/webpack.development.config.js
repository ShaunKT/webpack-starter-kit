const path = require("path");
const webpack = require("webpack");

const HappyPack = require("happypack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    path: path.join(__dirname, "../", "dist/"),
    filename: "[name].js",
    publicPath: "/assets/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loaders: ["html-loader", "pug-html-loader"]
      },
      {
        test: /\.js?x$/,
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
        test: /\.(js|jsx)$/,
        exclude: /(node_modules\/)/,
        enforce: "pre",
        loader: "eslint-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["image-webpack-loader", "url-loader"]
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HappyPack({
      loaders: ["react-hot-loader/webpack", "babel-loader"]
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Webpack starter",
      template: path.resolve(__dirname, "../src/views/index.pug")
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
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
