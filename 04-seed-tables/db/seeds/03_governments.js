exports.seed = knex => {
  return knex('governments').insert([
    { id: 1, name: 'Constitutional Monarchy' },
    { id: 2, name: 'Presidential Republic' }
  ]).then(() => {
    return knex.raw(
      `SELECT setval('governments_id_seq', (SELECT MAX(id) FROM governments));`
    )
  })
}
