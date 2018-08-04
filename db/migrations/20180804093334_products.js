exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', table => {
    table.increments();
    table.string('name').notNullable();
    table.decimal('price', 8, 2);
    table.integer('inventory');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};
