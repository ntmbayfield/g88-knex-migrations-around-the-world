
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
          city_id: 3},
        { id: 4,
          name: 'Carcassone Castle',
          established: 1621,
          city_id: 4},
        { id: 5,
          name: 'Musee Dorsay',
          established: 1834,
          city_id: 5},
        { id: 6,
          name: 'The Louvre',
          established: 1955,
          city_id: 5}
      ])
    }).then(() => {
      return knex.raw(
         `SELECT setval('landmarks_id_seq', (SELECT MAX(id) FROM landmarks));`)
    })
};
