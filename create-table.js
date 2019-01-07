/*
// create-table.js
// author: André Fillype (05/01/2019)
// desc: create tables and populate initial data on database
*/

// mysql plugin connection
const mysql = require('mysql');
const connection = mysql.createConnection({
   host: '127.0.0.1',
   port: 3306,
   user: 'root',
   password: 'root',
   database: 'mymovies'
});

// create table: Category
function createCategoryTable(connection) {
   const sql = "CREATE TABLE IF NOT EXISTS Category (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id))";
   
   connection.query(sql, function(error, results, fields){
      if(error) return console.log(error);
      console.log('Category Table Created');
   });
}

// create table: Movies
function createMoviesTable(connection) {
   const sql = "CREATE TABLE IF NOT EXISTS Movies (id INT NOT NULL AUTO_INCREMENT, img TEXT, name VARCHAR(255) NOT NULL, category INT NOT NULL, duration INT, PRIMARY KEY (id), FOREIGN KEY (category) REFERENCES Category (id))";

   connection.query(sql, function(error, results, fields){
      if(error) return console.log(error);
      console.log('Movies Table Created');
   });
}

// populate initial data on Category table
function populateCategoryTable(connection) {
   const sql = "INSERT INTO Category (name) VALUES ?";
   const values = [
      ['Ação'], ['Anime'], ['Clássicos'], ['Comédia'], ['Documentário'], ['Drama'], ['Ficção Científica'], ['Fantasia'], ['Infantil'], ['Policiais'], ['Romance'], ['Suspense'], ['Terror']
   ];

   connection.query(sql, [values], function(error, results, fields) {
      if(error) return console.log(error);
      console.log('Tables populated!');
      connection.end();
   })
}

// establish connection and executes functions
connection.connect(function(err){
   if(err) return console.log(err);
   createCategoryTable(connection);
   createMoviesTable(connection);
   populateCategoryTable(connection);
});
