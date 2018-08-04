
exports.seed = function (knex, Promise) {
  return knex('articles').del()
    .then(function () {
      return knex('articles').insert([
        { title: 'I am Groot', author: 'I am groot', content: 'We are Groot. We are Groot. We are Groot. I am Groot. I am Groot. We are Groot. I am Groot. I am Groot. I am Groot. I am Groot. We are Groot. I am Groot. We are Groot. I am Groot. I am Groot.', urltitle: 'I%20am%20Groot' },
        { title: 'I am Groot II', author: 'I am groot', content: 'I am groooooooot', urltitle: 'I%20am%20Groot%20II' },
        { title: 'I am Steve Rogers', author: 'Steve Rogers', content: 'I am Captain America.', urltitle: '"I%20am%20Steve%20Rogers"' }
      ]);
    });
};
