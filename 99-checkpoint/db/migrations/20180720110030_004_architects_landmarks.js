
exports.up = function(knex, Promise) {
  return knex.schema.createTable('architects_landmarks', table => {
    table.integer('architect_id').notNullable().defaultsTo(0)
    table.foreign('architect_id').references('architects.id').onDelete('CASCADE')
    table.integer('landmark_id').notNullable().defaultsTo(0)
    table.foreign('landmark_id').references('landmarks.id').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('architects_landmarks')
};
