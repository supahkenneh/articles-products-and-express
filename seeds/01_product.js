
exports.seed = function(knex, Promise) {
  return knex('products').del()
    .then(function () {
      return knex('table_name').insert([
        {name: 'NMD', price: 150.00},
        {},
        {}
      ]);
    });
};
