const fs = require('fs')
const path = require('path')

describe('Continents Seeds', function () {
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

  it('creates at least one new continent', function () {
    return knex('continents')
    .then(actual => {
      expect(actual.length).to.be.at.least(1)

      const [continent] = actual
      expect(continent.id).to.be.ok
      expect(continent.name).to.be.ok
      expect(continent.created_at).to.be.ok
      expect(continent.updated_at).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })

  it('resets the sequence max id each time', function () {
    return knex('continents')
    .insert({ name: 'xxx' }, '*')
    .then(([{ id }]) => {
      return knex('continents').then(continents => {
        const err = `Check that you've reset the auto-incrementing ID`
        expect(id, err).to.equal(continents.length)
      })
    })
    .catch((err) => Promise.reject(err))
  })
})
