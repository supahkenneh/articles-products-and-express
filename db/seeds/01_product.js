
exports.seed = function (knex, Promise) {
  return knex('products').del()
    .then(function () {
      return knex('products').insert([
        { name: 'Vibranium Ore', price: 25000.00, inventory: 53 },
        { name: 'Awesome Mix Vol 1', price: 19.50, inventory: 1 },
        { name: 'Infinity Gauntlet', price: 9999.99, inventory: 1 }
      ]);
    });
};