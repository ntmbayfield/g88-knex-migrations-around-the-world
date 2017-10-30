exports.seed = knex => {
  return knex('architects').del()
    .then(() => {
      return knex('architects').insert([
        { id: 1, name: 'Carl F. Gould' },
        { id: 2, name: 'John Graham' },
        { id: 3, name: 'James Knox Taylor' },
        { id: 4, name: 'William Gladstone Merchant' },
        { id: 5, name: 'Bernard Maybeck' },
        { id: 6, name: 'Walter D. Bliss' },
        { id: 7, name: 'William B. Faville' },
      ])
    }).then(() => {
      return knex.raw(`SELECT setval('architects_id_seq', (SELECT MAX(id) FROM architects));`)
    })
}
