module.exports = {
  extends: ["plugin:react/recommended"], //'airbnb-base',
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
    "comma-dangle": 1,
    "object-shorthand": 1,
    "object-curly-spacing": 0,
    "no-multiple-empty-lines": 1,
    "arrow-body-style": 0,
    "brace-style": 0,
    "react/prefer-stateless-function": 0
  }
};
