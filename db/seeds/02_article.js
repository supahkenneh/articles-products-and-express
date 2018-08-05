
exports.seed = function (knex, Promise) {
  return knex('articles').del()
    .then(function () {
      return knex('articles').insert([
        { title: 'I am Groot', author: 'I am groot', content: 'We are Groot. We are Groot. We are Groot. I am Groot. I am Groot. We are Groot. I am Groot. I am Groot. I am Groot. I am Groot. We are Groot. I am Groot. We are Groot. I am Groot. I am Groot.', urltitle: 'i%20am%20groot' },
        { title: 'I am Groot II', author: 'I am groot', content: 'I am groooooooot', urltitle: 'i%20am%20groot%20ii' },
        { title: 'I am Steve Rogers', author: 'Steve Rogers', content: 'I am Captain America.', urltitle: '"i%20am%20steve%20rogers"' }
      ]);
    });
};
