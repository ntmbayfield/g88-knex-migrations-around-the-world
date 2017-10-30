exports.seed = knex => {
  return knex('landmarks').del()
    .then(() => {
      return knex('landmarks').insert([
        { id: 1, name: 'Seattle Asian Art Museum', established: 1994, city_id: 1 },
        { id: 2, name: 'Space Needle', established: 1962, city_id: 1 },
        { id: 3, name: 'Denver Mint', established: 1897, city_id: 2 },
        { id: 4, name: 'American Conservatory Theater', established: 1910, city_id: 3 },
        { id: 5, name: 'Palace of Fine Arts', established: 1965, city_id: 3 },
      ])
    }).then(() => {
      return knex.raw(`SELECT setval('landmarks_id_seq', (SELECT MAX(id) FROM landmarks));`)
    })
}
