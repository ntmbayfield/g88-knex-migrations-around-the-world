
exports.up = function(knex, Promise) {
  return knex.schema.createTable('landmarks', table => {
    table.increments('id')
    table.string('name').notNullable().defaultsTo('')
    table.integer('established').notNullable().defaultsTo(0)
    table.integer('city_id').notNullable().defaultsTo(0)
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('landmarks')
};
