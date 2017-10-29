exports.up = knex => {
  return knex.schema.table('countries', table => {
    table.dropColumn('government_type')
  })
}

exports.down = knex => {
  return knex.schema.table('countries', table => {
    table.string('government_type').notNullable().defaultsTo('')
  })
}
