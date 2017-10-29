exports.seed = knex => {
  return knex('countries').delete().then(() => {
    return knex('countries').insert([
      { id: 1, name: 'Denmark', population: 5733551, continent_id: 3 },
      { id: 2, name: 'Jordan', population: 9702353, continent_id: 1 },
      { id: 3, name: 'Honduras', population: 9265067, continent_id: 2 }
    ]).then(() => {
      return knex.raw(
        `SELECT setval('countries_id_seq', (SELECT MAX(id) FROM countries));`
      )
    })
  })
}
