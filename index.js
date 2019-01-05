// EXPRESS CONSTANTS

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');

// BODYPARSER CONFIGS

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTE DEFINITION
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Working!'  }));
router.get('/movies/:id?', (req, res) => {
   let where = '';
   if(req.params.id) where = ' WHERE id = ' + parseInt(req.params.id);
   executeCommand('SELECT * FROM movies' + where, res);
});
router.post('/movies', (req, res) => {
   const img = req.body.img;
   const name = req.body.name;
   const category = req.body.category;
   const duration = req.body.duration;

   executeCommand(`INSERT INTO Movies(img, name, category, duration) VALUES ('${img}', '${name}', '${category}', '${duration}')`, res);
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
