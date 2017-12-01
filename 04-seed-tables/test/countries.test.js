const fs = require('fs')
const path = require('path')

describe('Countries Seeds', function () {
  beforeEach(function () {
    this.config = {
      migrations: {
        directory: path.join(__dirname, '..', 'db', 'migrations')
      },
      seeds: {
        directory: path.join(__dirname, '..', 'db', 'seeds')
      }
    }

    return knex.migrate.latest(this.config.migrations)
    .then(() => knex.seed.run(this.config.seeds))
    .catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('creates at least one new country', function () {
    return knex('countries')
    .then(actual => {
      expect(actual.length).to.be.at.least(1)

      const [country] = actual
      expect(country.id).to.be.ok
      expect(country.name).to.be.ok
      expect(country.population).to.be.ok
      expect(country.created_at).to.be.ok
      expect(country.updated_at).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })

  it('is associated with an existing continent', function () {
    return knex('countries')
    .then(actual => {
      const [country] = actual
      return knex('continents').where({ id: country.continent_id }).first()
    }).then(continent => {
      expect(continent).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })

  it('resets the sequence max id each time', function () {
    return knex('countries')
    .insert({ name: 'xxx', population: 0, continent_id: 1 }, '*')
    .then(([{ id }]) => {
      return knex('countries').then(countries => {
        const err = `Check that you've reset the auto-incrementing ID`
        expect(id, err).to.equal(countries.length)
      })
    })
    .catch((err) => Promise.reject(err))
  })
})
