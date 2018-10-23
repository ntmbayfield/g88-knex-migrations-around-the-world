
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cities').del()
    .then(function () {
      // Inserts seed entries
      return knex('cities').insert([
        {id: 1, name: 'London'},
        {id: 2, name: 'Paris'},
        {id: 3, name: 'San Francisco'}
      ]);
    });
};
