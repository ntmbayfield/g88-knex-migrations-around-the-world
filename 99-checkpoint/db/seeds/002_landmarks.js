
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('landmarks').del()
    .then(function () {
      // Inserts seed entries
      return knex('landmarks').insert([
        { id: 1,
          name: 'Roman Bathhouse',
          established: 562,
          city_id: 1},
        { id: 2,
          name: 'Toledo Bridge',
          established: 1996,
          city_id: 2},
        { id: 3,
          name: 'Bull Fight Arena',
          established: 2004,
          city_id: 3}
      ])
    }).then(() => {
      return knex.raw(
         `SELECT setval('landmarks_id_seq', (SELECT MAX(id) FROM landmarks));`)
    })
};
