// ======== IMAGE LOADERS AND FONTS ======== //

// File and URL loaders
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpeg|jpg|png|gif|svg|ico)$/i,
        include,
        exclude,

        use: [
          'image-webpack-loader',
          {
            loader: 'url-loader',
            options,
          },
        ],
      },
    ],
  },
});

// Font loaders
exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,

        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});