exports.up = knex => {
  return knex.schema.createTable('landmarks', table => {
    table.increments()
    table.string('name').notNullable().defaultsTo('')
    table.integer('established').notNullable().defaultsTo(0)
    table.integer('city_id').notNullable()
    table.foreign('city_id').references('cities.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable('landmarks')
}
