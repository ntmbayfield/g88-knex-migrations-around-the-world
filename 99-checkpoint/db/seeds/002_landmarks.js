
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('landmarks').del()
    .then(function () {
      // Inserts seed entries
      return knex('landmarks').insert([
        {id: 1, name: 'Buckingham Palace', city_id: 1},
        {id: 2, name: 'Eiffel Tower', city_id: 2},
        {id: 3, name: 'Big Ben', city_id: 1}
      ]);
    });
};
