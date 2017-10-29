exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('countries_governments').del()
  .then(() => knex('governments').del())
  .then(() => knex('countries').del())
  .then(() => knex('continents').del())
}
