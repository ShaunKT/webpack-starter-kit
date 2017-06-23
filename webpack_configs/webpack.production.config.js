const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HappyPack = require("happypack");

const cssnano = require("cssnano");
const PurifyCSSPlugin = require("purifycss-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const entryPoint = path.resolve(__dirname, "../src/");
const stylesEntryPoint = path.resolve(__dirname, "../src/styles");

exports.productionConfig = () => ({
  name: "client",
  target: "web",
  entry: path.join(__dirname, "../", "src/", "index-client.jsx"),
  output: {
    path: path.join(__dirname, "../dist/"),
    filename: "client.js",
    publicPath: "/assets/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(pug|html)$/,
        loaders: ["html-loader", "pug-html-loader"]
      },
      {
        test: /\.js?x$/,
        include: entryPoint,
        exclude: /(node_modules\/)/,
        loader: "happypack/loader"
      },
      {
        test: /\.s?css$/,
        include: stylesEntryPoint,

        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
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
        })
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
      loaders: ["babel-loader"]
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(`${entryPoint}/**/*.js`, { nodir: true })
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        safe: true
      },
      canPrint: true
    }),
    new ExtractTextPlugin({
      filename: "styles/[name].[contenthash:8].css"
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
});