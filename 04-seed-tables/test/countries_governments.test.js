const fs = require('fs')
const path = require('path')

describe('Countries-Governments Seeds', function () {
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

  it('creates at least one join', function () {
    return knex('countries_governments')
    .then(actual => {
      expect(actual.length).to.be.at.least(1)

      const [row] = actual
      expect(row.country_id).to.be.ok
      expect(row.government_id).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })

  it('is associated with an existing country', function () {
    return knex('countries_governments')
    .then(actual => {
      const [row] = actual
      return knex('countries').where({ id: row.country_id }).first()
    }).then(country => {
      expect(country).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })

  it('is associated with an existing government', function () {
    return knex('countries_governments')
    .then(actual => {
      const [row] = actual
      return knex('governments').where({ id: row.government_id }).first()
    }).then(government => {
      expect(government).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })
})
