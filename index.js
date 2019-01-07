// EXPRESS CONSTANTS

const multer = require('multer');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');

// BODYPARSER CONFIGS

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ALLOW IMG IN BROWSER
app.use(express.static('uploads'));

// UPLOAD CONFIGS

app.use(express.static(path.join(__dirname, 'uploads')));
console.log(path.join(__dirname, 'uploads'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, './uploads/')
   },
   filename: function (req, file, cb) {
     cb(null, file.originalname);
   }
 });

var upload = multer({ storage: storage });

// ROUTE DEFINITION

const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Working!'  }));

////// MOVIES ROUTES

router.get('/movies/:search?', (req, res) => {
   let where = '';
   if(req.params.search != '' && req.params.search != undefined) {
      if(isNaN(req.params.search)) {
         where = ' WHERE m.name LIKE "%' + req.params.search + '%"';
      } else {
	where = ' WHERE m.id = ' + parseInt(req.params.search);
      }
   }
   executeCommand('SELECT m.*, c.name AS "category_name" FROM movies m INNER JOIN Category c ON m.category = c.id' + where, res);
});
router.post('/movies', (req, res) => {
   const img = req.body.img;
   const name = req.body.name;
   const category = req.body.category;
   const duration = req.body.duration;

   executeCommand(`INSERT INTO Movies(img, name, category, duration) VALUES ('${img}', '${name}', '${category}', '${duration}')`, res);
});

////// CATEGORY ROUTES

router.get('/category/:id?', (req, res) => {
   let where = '';
   if(req.params.id) where = ' WHERE id = ' + parseInt(req.params.id);
   executeCommand('SELECT * FROM category' + where, res);
});

////// UPLOAD IMAGE ROUTES

router.post("/upload", upload.single("image"), function(req, res) {
   console.log(req.file);
});

app.use('/', router);

// STARTING APP

app.listen(port);
console.log('Working!');

// FUNCTIONS

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
