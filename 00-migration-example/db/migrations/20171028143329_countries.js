
exports.up = function(knex, Promise) {
  return knex.schema.createTable('countries', table => {
    table.increments()
    table.string('name').notNullable()
    table.integer('population').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('countries')
};
