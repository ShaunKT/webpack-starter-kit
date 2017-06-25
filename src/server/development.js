const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 7070;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

app.use("static", express.static(path.join(__dirname, "./")));




// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(PORT);
console.log(`Listerning on http://localhost:${PORT}`);
