
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', table => {
    table.increments('user_id').primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    // table.timestamp('created_at').defaultTo(knex.fn.now());
    // table.timestamp('updated_at').defaultTo(knex.fn.now());

    // shorthand notation for created_at updated_at
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};