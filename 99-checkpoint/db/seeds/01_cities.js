exports.seed = knex => {
  return knex('cities').del()
    .then(() => {
      return knex('cities').insert([
        { id: 1, name: 'Seattle' },
        { id: 2, name: 'Denver' },
        { id: 3, name: 'San Francisco' }
      ])
    }).then(() => {
      return knex.raw(`SELECT setval('cities_id_seq', (SELECT MAX(id) FROM cities));`)
    })
}
