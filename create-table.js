const mysql = require('mysql');
const connection = mysql.createConnection({
   host: '127.0.0.1',
   port: 3306,
   user: 'root',
   password: 'root',
   database: 'mymovies'
});

function createCategoryTable(connection) {
   const sql = "CREATE TABLE IF NOT EXISTS Category (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id))";
   
   connection.query(sql, function(error, results, fields){
      if(error) return console.log(error);
      console.log('Category Table Created');
   });
}

function createMoviesTable(connection) {
   const sql = "CREATE TABLE IF NOT EXISTS Movies (id INT NOT NULL AUTO_INCREMENT, img TEXT, name VARCHAR(255) NOT NULL, category INT NOT NULL, duration INT, PRIMARY KEY (id), FOREIGN KEY (category) REFERENCES Category (id))";

   connection.query(sql, function(error, results, fields){
      if(error) return console.log(error);
      console.log('Movies Table Created');
   });
}

connection.connect(function(err){
   if(err) return console.log(err);
   createCategoryTable(connection);
   createMoviesTable(connection);
});
