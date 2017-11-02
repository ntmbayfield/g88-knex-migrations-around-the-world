const fs = require('fs')
const path = require('path')

xdescribe('Architects-Landmarks Seeds', function () {
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

  it('creates at least one join', function () {
    return knex('architects_landmarks')
    .then(actual => {
      expect(actual.length).to.be.at.least(1)

      const [row] = actual
      expect(row.architect_id).to.be.ok
      expect(row.landmark_id).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })

  it('is associated with an existing architect', function () {
    return knex('architects_landmarks')
    .then(actual => {
      const [row] = actual
      return knex('architects').where({ id: row.architect_id }).first()
    }).then(architect => {
      expect(architect).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })

  it('is associated with an existing landmark', function () {
    return knex('architects_landmarks')
    .then(actual => {
      const [row] = actual
      return knex('landmarks').where({ id: row.landmark_id }).first()
    }).then(landmark => {
      expect(landmark).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })
})
