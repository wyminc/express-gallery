
exports.up = function (knex, Promise) {
  return knex.schema.createTable('gallery', function (table) {
    table.increments();
    table.integer('author_id').notNullable().unsigned();
    table.foreign('author_id').references('id').inTable('authors');
    table.string('link').notNullable();
    table.string('description').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('gallery');
};
