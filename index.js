/*
// index.js
// author: André Fillype (05/01/2019)
// desc: config and server backend application
*/

// express constants
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mongoose = require('mongoose');
const config = require('./config');

// mongoose configuration
mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// bodyparser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allow image in browser
app.use(express.static('uploads'));

// upload config
app.use(express.static(path.join(__dirname, 'uploads')));
console.log(path.join(__dirname, 'uploads'));

// cors config
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// route definition
const index = require('./routes/index');
const movies = require('./routes/movies');
const categories = require('./routes/categories');

app.use('/', index);
app.use('/movies', movies);
app.use('/categories', categories);

// starting app
app.listen(port);
console.log('Working!');

// functions
function executeCommand(query, res) {
   const connection = mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'mymovies'
   });

   connection.query(query, function(error, results, fields) {
      if(error)
         res.json(error);
      else
         res.json(results);
      connection.end();
   });
}
