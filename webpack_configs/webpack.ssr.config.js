const path = require("path");
const HappyPack = require("happypack");

const entryPoint = path.resolve(__dirname, "../src/");
const stylesEntryPoint = path.resolve(__dirname, "../src/styles");

exports.ssrConfig = () => ({
  name: "server",
  target: "node",
  entry: path.join(__dirname, "../", "src/", "index-server.jsx"),
  output: {
    path: path.join(__dirname, "../", "dist/", "static"),
    filename: "server.js",
    libraryTarget: "commonjs2",
    publicPath: "./"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(pug|html)$/,
        use: ["html-loader", "pug-html-loader"]
      },
      {
        test: /\.js?x$/,
        include: entryPoint,
        exclude: /(node_modules\/)/,
        use: "happypack/loader"
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
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["image-webpack-loader", "url-loader"]
      }
    ]
  },
  plugins: [
    new HappyPack({
      loaders: ["babel-loader"]
    })
  ]
});
