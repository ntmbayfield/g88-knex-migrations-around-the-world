exports.up = knex => {
  return knex.schema.createTable('countries', table => {
    table.increments()
    table.string('name').notNullable().defaultsTo('')
    table.integer('population').notNullable().defaultsTo(0)
    table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable('countries')
}
