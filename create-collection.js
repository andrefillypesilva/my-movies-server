/*
// create-collection.js
// author: André Fillype (05/01/2019)
// updated: André Fillype (30/06/2020)
// desc: populate initial data on database
*/

const mongoose = require('mongoose');
const config = require('./config');
const slugGenerator = require('./utils/slug-generator');

// mongoose configuration
mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// models definition
const Category = require('./models/category');

// repository definition
const categoryRepository = require('./repository/category');

// populate initial data on Category collection
populateCategoryCollection = async () => {
   console.log('Executando script de criação de collection...');

   const values = [
      'Ação', 'Anime', 'Clássicos', 'Comédia', 'Documentário', 'Drama', 'Ficção Científica', 'Fantasia', 'Infantil', 'Policial', 'Romance', 'Suspense', 'Terror'
   ];

   values.forEach(async value => {
      let slug = slugGenerator.stringToSlug(value);
      await categoryRepository.post({ name: value, slug });
   });

}

populateCategoryCollection();

setTimeout(() => {
   return process.exit(22);
}, 2000);

process.on('exit', code => {
   return console.log('Script encerrado e base de dados populada: ', code);
});