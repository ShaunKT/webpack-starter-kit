## webpack-starter-kit

This is a basic webpack 2 starter kit for react, react router V4 and sass.



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

  `yarn start:wds`
  

2) **Staging** builds minified files with source maps, debugs and console.logs.

  `yarn build:staging`
  

3) **Production** builds minified files with removed source maps, debugs and console.logs.

  `yarn build:production`


4) **Server Side Rendering** test build server rendering. (Not you have to run a NGINX server)

  `yarn start:prod`


5) **Stats** builds your stats.json file in the root directory

  `yarn stats`


6) **Lint Javascript files**

  `yarn js:lint`



## Folder Structure

 
    |-- src
    |   |-- index.js
    |   |
    |   |-- client
    |   |  |-- client-app.js
    |   |
    |   |-- server
    |   |  |-- index.js
    |   |  |-- server-app.js
    |   |
    |   |-- elements
    |   |  |-- components
    |   |  |-- container
    |   |  |-- naviagtion
    |   |  |-- ui
    |   |
    |   |-- routes
    |   |  |-- client-routes
    |   |  |-- server-routes
    |   |  |-- routes.js
    |   |
    |   |-- actions
    |   |  |-- hello.js
    |   |
    |   |-- reducers
    |   |  |-- hello.js
    |   |
    |   |-- stores
    |   |  |-- hello-store.js 
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
    |   |  |-- index.ejs
    |   
    |-- package.json
    |-- webpack.config.js
    |-- webpack.configs
    |   |-- webpack.modules.js 
    |   
    |-- .babelrc
    |-- .gitignore 
    |-- .eslintrc.js
    |-- stylelint.config.js 
    |-- postcss.config.js