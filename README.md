## webpack-starter-kit

This is a basic webpack 2 starter kit for react, react router V4 and sass.



## Getting started

To get started you need to run `npm install`.

**Note:**  This setup was created using Node 8 and NPM 5.0.3.




## Setting up Linters

Setting up the linter packages helps keep the css/sass styles and javascript consistant in the project.


#### 1) Style Linters

  - Stylinter = [https://stylelint.io/]
  
  - Airbnb Styles - [https://github.com/airbnb/css]
  
  - BEM = [http://getbem.com/introduction/]

  - setup vscode = [https://github.com/shinnn/vscode-stylelint]
  
  - setup atom = [https://atom.io/packages/linter-stylelint]
  

  `npm install stylelint`
  
  `npm install stylelint-scss`
  
  `npm install stylelint-selector-bem-pattern`
  
  
  
#### 2) Javascript/JSX Linters

  - Airbnb Linter = [https://github.com/airbnb/javascript]
  
  - Eslint react plugin  = [https://www.npmjs.com/package/eslint-plugin-react]
  

  - setup vscode = install extension eslint
  
  - setup atom = `apm install linter-eslint`
  

  `npm i eslint-config-airbnb-base`
 


## Webpack 

Once you have completed the setup run one of the 4 webpack.configs ENV's (Development, Staging, Production, Server).


1) **Development** runs on Dev Server localhost:3030 with Hot Module Replacement

  `npm run development`
  
  `npm run lint:js`
  

2) **Staging** builds minified files with source maps, debugs and console.logs.

  `npm run staging`
  

3) **Production** builds minified files with removed source maps, debugs and console.logs.

  `npm run production`
  

4) **Server Side Rendering** builds files for server rendering.

  `npm run ssr`
  
  

## Folder Structure

    
    
    |-- package.json
    |-- src
    |   |-- index.js  
    |   |-- app-client.js  
    |   |-- app-server.js
    |   |-- actions
    |   |  |-- user.js
    |   |  |-- login.js
    |   |  |-- settings.js
    |   |
    |   |-- containers
    |   |  |-- home.js
    |   |  |-- Login.js
    |   |  |-- dashbourd.js
    |   |
    |   |-- components
    |   |  |-- header.js
    |   |  |-- navigation.js
    |   |  |-- footer.js
    |   |
    |   |-- routes
    |   |  |-- routes.js
    |   |  |-- asyncRoutes.js
    |   |  |-- syncRoutes.js
    |   |  |-- libs
    |   |  |   |-- asyncComponent.js
    |   |
    |   |-- reducers
    |   |  |-- user.js
    |   |  |-- login.js
    |   |  |-- settings.js
    |   |
    |   |-- stores
    |   |  |-- user.js
    |   |  |-- login.js
    |   |  |-- settings.js   
    |   |
    |   |-- images
    |   |  |-- img.png
    |   |  |-- img.jpg
    |   |  |-- img.gif
    |   |  |-- favicon.ico
    |   |
    |   |-- styles
    |   |  |-- main.scss
    |   |  |-- containers
    |   |  |   |-- home.js
    |   |  |   |-- Login.js
    |   |  |   |-- dashbourd.js
    |   |  |-- components
    |   |  |   |-- header.js
    |   |  |   |-- navigation.js
    |   |  |   |-- footer.js
    |
    |-- server
    |   |-- server.js
    |
    |-- webpack.config.js 
    |-- webpack_env_configs 
    |   |-- webpack.development.config.js
    |   |-- webpack.ssr.config.js
    |   |-- webpack.production.config.js   
    |
    |-- .babelrc
    |-- .gitignore 
    |-- .eslintrc.js
    |-- stylelint.config.js 
    |-- postcss.config.js
    

