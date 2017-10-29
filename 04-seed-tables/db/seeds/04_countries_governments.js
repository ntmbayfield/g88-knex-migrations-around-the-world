exports.seed = knex => {
  return knex('countries_governments').insert([
    { country_id: 1, government_id: 1 },
    { country_id: 2, government_id: 1 },
    { country_id: 3, government_id: 2 }
  ])
}
