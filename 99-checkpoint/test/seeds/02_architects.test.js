const fs = require('fs')
const path = require('path')

describe('Architects Seeds', function () {
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

  it('creates at least one new architect', function () {
    return knex('architects')
    .then(actual => {
      expect(actual.length).to.be.at.least(1)

      const [architect] = actual
      expect(architect.id).to.be.ok
      expect(architect.name).to.be.ok
      expect(architect.created_at).to.be.ok
      expect(architect.updated_at).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })

  it('resets the sequence max id each time', function () {
    return knex('architects')
    .insert({ name: 'xxx' }, '*')
    .then(([{ id }]) => {
      return knex('architects').then(architects => {
        const err = `Check that you've reset the auto-incrementing ID`
        expect(id, err).to.equal(architects.length)
      })
    })
    .catch((err) => Promise.reject(err))
  })
})
