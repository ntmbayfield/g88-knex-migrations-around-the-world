exports.seed = knex => {
  return knex('continents').delete().then(() => {
    return knex('continents').insert([
      { id: 1, name: 'Asia' },
      { id: 2, name: 'Americas' },
      { id: 3, name: 'Europe' }
    ]).then(() => {
      return knex.raw(
        `SELECT setval('continents_id_seq', (SELECT MAX(id) FROM continents));`
      )
    })
  })
}
