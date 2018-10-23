
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cities').del()
    .then(function () {
      // Inserts seed entries
      return knex('cities').insert([
        {id: 1, name: 'Venice'},
        {id: 2, name: 'Toledo'},
        {id: 3, name: 'Madrid'},
        {id: 4, name: 'Carcassone'},
        {id: 5, name: 'Paris'}
      ])
    }).then(() => {
        return knex.raw(`SELECT setval('cities_id_seq', (SELECT MAX(id) FROM cities))`)
  })
}
