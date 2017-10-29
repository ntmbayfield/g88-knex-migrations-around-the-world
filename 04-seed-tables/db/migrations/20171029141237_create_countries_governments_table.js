exports.up = knex => {
  return knex.schema.createTable('countries_governments', table => {
    table.integer('country_id').notNullable()
    table.integer('government_id').notNullable()

    table.foreign('country_id').references('countries.id').onDelete('CASCADE')
    table.foreign('government_id').references('governments.id').onDelete('CASCADE')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('countries_governments')
}
