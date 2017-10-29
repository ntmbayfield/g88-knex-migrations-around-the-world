exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('countries').del()
    .then(() => {
      // Inserts seed entries
      return knex('countries').insert([
        { name: 'Germany', population: 82114224 },
        { name: 'Puerto Rico', population: 3663131 },
        { name: 'Qatar', population: 2639211 }
      ])
    })
}
