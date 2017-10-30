exports.up = knex => {
  return knex.schema.createTable('cities', table => {
    table.increments()
    table.string('name').notNullable().defaultsTo('')
    table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable('cities')
}
