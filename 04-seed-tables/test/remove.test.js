const fs = require('fs')
const path = require('path')

describe('Remove Seeds', function () {
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

  it('drops all the data before re-creating it', function () {
    return Promise.all([
      knex('continents'),
      knex('countries'),
      knex('governments'),
      knex('countries_governments')
    ]).then(([
      continents,
      countries,
      governments,
      countriesGovernments
    ]) => {
      return knex.seed.run(this.config.seeds).then(() => {
        return Promise.all([
          knex('continents'),
          knex('countries'),
          knex('governments'),
          knex('countries_governments')
        ]).then(([
          continentsNew,
          countriesNew,
          governmentsNew,
          countriesGovernmentsNew
        ]) => {
          expect(continents.length).to.equal(continentsNew.length)
          expect(countries.length).to.equal(countriesNew.length)
          expect(governments.length).to.equal(governmentsNew.length)
          expect(countriesGovernments.length).to.equal(countriesGovernmentsNew.length)
        })
      })
    })
    .catch((err) => Promise.reject(err))
  })
})
