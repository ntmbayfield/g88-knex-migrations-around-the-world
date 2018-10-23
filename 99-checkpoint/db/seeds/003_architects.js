
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('architects').del()
    .then(function () {
      // Inserts seed entries
      return knex('architects').insert([
        {id: 1, name: 'Sally Salesforce'},
        {id: 2, name: 'George Galvanize'},
        {id: 3, name: 'Oscar Oracle'},
        {id: 4, name: 'Carl Corsini'},
        {id: 5, name: 'Nik Seif'}
      ]);
    })

    .then(() => {
      return knex.raw(
         `SELECT setval('architects_id_seq', (SELECT MAX(id) FROM architects));`)
    })
};
