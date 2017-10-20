## React Webpack Starter Kit

This is a basic Webpack 3 starter kit for React 16, React-Router V4, Node(Express) and Sass

**Note:**
This setup was created using Node 8.1.3 and npm 5.5.1 || yarn 1.2.1.


## Getting started

To get started you need to run ```yarn install```.


## Setting up Linters

Setting up the linter packages helps keep the code consistent in the project.

#### 1) Prettier - Prettier is an opinionated code formatter

  - Prettier - [https://github.com/prettier/prettier]

  - setup vscode = [https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode]

  - setup atom = [https://atom.io/packages/prettier-atom]


## Webpack

Once you have completed the setup, run one of the Webpack configurations.

1) **Development** (Webpack with Hot Module Replacement)

  Terminal One
  Run `yarn start` - this starts nodemon --ignore build --exec babel-node on localhost:4000

  Terminal Two
  Run `yarn start:wds` - this starts the Webpack Dev Server

  Browser
  Open your browser on http://localhost:4000/


2) **Staging**

"start": "better-npm-run build:development NODE_ENV=development",
"start:wds":
  "webpack-dev-server --config ./webpack/webpack.client.babel.js",
"build:production":
  "yarn clean && better-npm-run client:production && better-npm-run server",
"build:server": "better-npm-run clean:server && better-npm-run server",
"run:node": "better-npm-run start:node",
"clean": "better-npm-run clean"


2) **Production**

  Run `build:production` - This will remove your old build folder and compile a new build


3) **Run the production build with Node**

run `yarn run:node` runs the production build on your local with node


6) **Clean**

  run `yarn clean` removes the old build folder



## Folder Structure

    react-app
    |
    |-- customization
    |
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
    |   |  |-- pages
    |   |  |-- container
    |   |  |-- components
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
    |   |-- assets
    |   |  |-- images
    |   |  |-- favicon
    |   |
    |   |-- styles
    |   |  |-- ui
    |   |  |-- util
    |   |  |-- fonts
    |   |  |-- pages
    |   |  |-- containers
    |   |  |-- components
    |   |  |-- animations
    |   |  |-- main.scss
    |   |
    |   |-- views
    |   |  |-- react-html.js
    |   
    |-- webpack
    |   |-- webpack.client.babel.js
    |   |-- webpack.server.babel.js
    |   |-- webpack.modules.config.js
    |
    |-- package.json
    |-- .babelrc
    |-- .gitignore
    |-- nodemon.json
    |-- readme.md
