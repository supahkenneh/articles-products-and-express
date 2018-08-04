exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', table => {
    table.increments();
    table.string('title').notNullable();
    table.string('author').notNullable();
    table.text('content');
    table.string('urltitle').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};
