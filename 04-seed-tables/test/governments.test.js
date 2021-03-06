const fs = require('fs')
const path = require('path')

describe('Governments Seeds', function () {
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

  it('creates at least one new government', function () {
    return knex('governments')
    .then(actual => {
      expect(actual.length).to.be.at.least(1)

      const [government] = actual
      expect(government.id).to.be.ok
      expect(government.name).to.be.ok
      expect(government.created_at).to.be.ok
      expect(government.updated_at).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })

  it('resets the sequence max id each time', function () {
    return knex('governments')
    .insert({ name: 'xxx' }, '*')
    .then(([{ id }]) => {
      return knex('governments').then(governments => {
        const err = `Check that you've reset the auto-incrementing ID`
        expect(id, err).to.equal(governments.length)
      })
    })
    .catch((err) => Promise.reject(err))
  })
})
