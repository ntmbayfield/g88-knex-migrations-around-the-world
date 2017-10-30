const fs = require('fs')
const path = require('path')

describe('Cities Seeds', function () {
  beforeEach(function () {
    this.config = {
      migrations: {
        directory: path.join(__dirname, '..', '..', 'db', 'migrations')
      },
      seeds: {
        directory: path.join(__dirname, '..', '..', 'db', 'seeds')
      }
    }

    return knex.migrate.latest(this.config.migrations)
    .then(() => knex.seed.run(this.config.seeds))
    .catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('creates at least one new city', function () {
    return knex('cities')
    .then(actual => {
      expect(actual.length).to.be.at.least(1)

      const [city] = actual
      expect(city.id).to.be.ok
      expect(city.name).to.be.ok
      expect(city.created_at).to.be.ok
      expect(city.updated_at).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })

  it('resets the sequence max id each time', function () {
    return knex('cities')
    .insert({ name: 'xxx' }, '*')
    .then(([{ id }]) => {
      return knex('cities').then(cities => {
        const err = `Check that you've reset the auto-incrementing ID`
        expect(id, err).to.equal(cities.length)
      })
    })
    .catch((err) => Promise.reject(err))
  })
})
