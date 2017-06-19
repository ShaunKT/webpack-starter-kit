var express = require('express');
var app     = express();
var PORT    =   process.env.PORT || 8080;
var router = express.Router();

var path = require('path');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var { renderToString } = require('react-dom/server');

var CampusSSR = require('./static');
var buildFile = require('./build/index.html');

// route middleware that will happen on every request
// router.use(function(req, res, next) {

//     // log each request to the console
//     console.log(req.method, req.url);

//     // continue doing what we were doing and go to the route
//     next(); 
// });
 
app.get('/index.html', function (req, res) {

  res.sendfile(buildFile);

});
function renderMarkup(html) {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>Webpack SSR Demo</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <div id="app">${html}</div>
    <script src="./index.js"></script>
  </body>
</html>`;
}


app.listen(PORT);
console.log('Server is running on http://localhost:' + PORT);

// app.use('/', express.static('./build/index.html'));

// respond with "hello world" when a GET request is made to the homepage
// router.get('/', function (req, res) {
//   res.send(__dirname + '/build/');
// })

// app.get('/', (req, res) => res.status(200).send(
//     renderToString('./build/')
// ));

// router.get('/about', function(req, res) {
//     res.send('im the about page!'); 
// });

// app.use(express.static(__dirname + 'build'));

// app.use('/', router);



//   app.use(express.static('static'));
// app.use(express.static(__dirname + 'build'));



// app.use(function(req, res, next) {
//   cookie.plugToRequest(req, res);
//   next();
// });

// router.get('/', function(req, res) {
//   res.status(200).json({
//       'status': 'ok'
//   });
// });

