const webpack = require("webpack");
const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

exports.ssrConfig = () => ({
  name: "server",
  target: "node",
  entry: path.join(__dirname, "../", "src/", "index-server.jsx"),
  output: {
    path: path.join(__dirname, "../", "dist/", "static"),
    filename: "server.js",
    libraryTarget: "commonjs2",
    publicPath: "/assets/"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js?x$/,
        exclude: /(node_modules\/)/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: "isomorphic-style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[hash:base64:10]",
                sourceMap: true
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["image-webpack-loader", "url-loader"]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "styles/styles.css",
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    }),
    new StatsPlugin("stats.json", {
      chunkModules: true,
      modules: true,
      chunks: true,
      exclude: [/node_modules[\\/]react/]
    })
  ]
});
