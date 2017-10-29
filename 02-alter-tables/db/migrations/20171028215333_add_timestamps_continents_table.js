exports.up = knex => {
  return knex.schema.table('continents', table => {
    table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.table('continents', table => {
    table.dropTimestamps()
  })
}
