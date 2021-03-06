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
const mongoose = require('mongoose');
const config = require('./config');
const fileUpload = require('express-fileupload');

// mongoose configuration
mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// models definition
const Category = require('./models/category');
const Movie = require('./models/movie');

app.use(fileUpload());

// bodyparser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// upload config
app.use(express.static(path.join(__dirname, 'uploads')));

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

module.exports = app;