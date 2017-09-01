## webpack-starter-kit

This is a basic webpack 3 starter kit for react, react router and sass.


## Getting started

To get started you need to run `yarn install`.

**Note:**  This setup was created using Node v8.1.3


## Setting up Linters

Setting up the linter packages helps keep the css/sass styles and javascript consistant in the project.


#### 1) Style Linters

  - Stylinter = [https://stylelint.io/]

  - Airbnb Styles - [https://github.com/airbnb/css]

  - BEM = [http://getbem.com/introduction/]

  - setup vscode = [https://github.com/shinnn/vscode-stylelint]

  - setup atom = [https://atom.io/packages/linter-stylelint]



#### 2) Javascript/JSX Linters

  - Airbnb Linter = [https://github.com/airbnb/javascript]

  - Eslint react plugin  = [https://www.npmjs.com/package/eslint-plugin-react]

  - setup vscode = install extension eslint

  - setup atom = `apm install linter-eslint`



## Webpack

Once you have completed the setup run one of the 4 webpack.configs ENV's (Development, Staging, Production, Server).


1) **Development** runs on Dev Server localhost:8080 with Hot Module Replacement

  `yarn start` runs nodemon ./index.js --exec babel-node


2) **Build Production**

  `yarn build` runs yarn build:client && yarn build:server

3) **Test Production**

  `yarn start:production` runs yarn build && yarn run:production


4) **Server Side Rendering**

  `yarn build:server` runs yarn clean:server && better-npm-run build:server

4) **Clean**

  `yarn clean:all` runs yarn clean:client && yarn clean:server



## Folder Structure

    |-- index.js
    |-- src
    |   |-- index.js
    |   |
    |   |-- app
    |   |  |-- app.js
    |   |
    |   |-- server
    |   |  |-- server.js
    |   |
    |   |-- elements
    |   |  |-- components
    |   |  |-- container
    |   |
    |   |-- routes
    |   |  |-- routes.js
    |   |
    |   |-- actions
    |   |  |-- actions.js
    |   |
    |   |-- reducers
    |   |  |-- reducers.js
    |   |
    |   |-- stores
    |   |  |-- store.js
    |   |
    |   |-- images
    |   |  |-- img.png
    |   |  |-- img.jpg
    |   |  |-- img.gif
    |   |
    |   |-- styles
    |   |  |-- main.scss
    |   |  |-- containers
    |   |  |-- components
    |   |  |-- animations
    |   |  |-- ui
    |   |
    |   |-- views
    |   |  |-- react-html.js
    |   
    |-- package.json
    |-- webpack
    |   |-- config.js
    |   |-- webpack.client.babel.js
    |   |-- webpack.server.babel.js
    |   |-- webpack.modules.config.js
    |   |-- webpackIsomorphicConfig.config.js
    |   
    |-- .babelrc
    |-- .gitignore
    |-- .eslintrc.js
    |-- stylelint.config.js
    |-- postcss.config.js
    |-- nodemon.json
