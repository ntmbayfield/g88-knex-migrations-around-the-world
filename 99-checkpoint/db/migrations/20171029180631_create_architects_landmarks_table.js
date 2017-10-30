exports.up = knex => {
  return knex.schema.createTable('architects_landmarks', table => {
    table.integer('architect_id').notNullable()
    table.foreign('architect_id').references('architects.id').onDelete('CASCADE')

    table.integer('landmark_id').notNullable()
    table.foreign('landmark_id').references('landmarks.id').onDelete('CASCADE')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('architects_landmarks')
}
