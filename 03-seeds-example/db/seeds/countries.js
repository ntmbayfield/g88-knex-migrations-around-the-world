exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('countries').del()
    .then(() => {
      // Inserts seed entries
      return knex('countries').insert([
        { id: 1, name: 'Germany', population: 82114224 },
        { id: 2, name: 'Puerto Rico', population: 3663131 },
        { id: 3, name: 'Qatar', population: 2639211 }
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('countries_id_seq', (SELECT MAX(id) FROM countries));`
      );
    })
}
