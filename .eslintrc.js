module.exports = {
  extends: ["airbnb"],
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      modules: true
    },
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "no-console": 0,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": 0,
    "import/first": 0,
    "no-param-reassign": 0,
    "no-redeclare": 0,
    "no-shadow": 0,
    "consistent-return": 0,
    "arrow-parens": 0,
    "func-names": 1,
    "block-spacing": 1,
    "no-unused-vars": 1,
    "no-trailing-spaces": 0,
    "comma-dangle": 0,
    "object-shorthand": 1,
    "object-curly-spacing": 0,
    "no-multiple-empty-lines": 1,
    "arrow-body-style": 0,
    "brace-style": 0,
    "react/prefer-stateless-function": 0,
    "no-underscore-dangle": 0,
    "global-require": 0,
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0
  },
  globals: {
    __CLIENT__: true,
    __SERVER__: true,
    __DISABLE_SSR__: true,
    __DEV__: true,
  }
};
