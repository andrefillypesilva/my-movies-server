/*
// create-collection.js
// author: André Fillype (05/01/2019)
// updated: André Fillype (30/06/2020)
// desc: populate initial data on database
*/

const categoryRepository = require('./repository/category');

// populate initial data on Category collection
populateCategoryCollection = () => {
   const values = [
      'Ação', 'Anime', 'Clássicos', 'Comédia', 'Documentário', 'Drama', 'Ficção Científica', 'Fantasia', 'Infantil', 'Policial', 'Romance', 'Suspense', 'Terror'
   ];

   values.forEach(value => {
      await categoryRepository.post({ name: value });
   });

}

populateCategoryCollection();