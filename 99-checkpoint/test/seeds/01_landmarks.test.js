const fs = require('fs')
const path = require('path')

xdescribe('Landmarks Seeds', function () {
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

  it('creates at least one new landmark', function () {
    return knex('landmarks')
    .then(actual => {
      expect(actual.length).to.be.at.least(1)

      const [landmark] = actual
      expect(landmark.id).to.be.ok
      expect(landmark.name).to.be.ok
      expect(landmark.established).to.be.ok
      expect(landmark.created_at).to.be.ok
      expect(landmark.updated_at).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })

  it('is associated with an existing continent', function () {
    return knex('landmarks')
    .then(actual => {
      const [landmark] = actual
      return knex('cities').where({ id: landmark.city_id }).first()
    }).then(continent => {
      expect(continent).to.be.ok
    })
    .catch((err) => Promise.reject(err))
  })

  it('resets the sequence max id each time', function () {
    return knex('landmarks')
    .insert({ name: 'xxx', established: 0, city_id: 1 }, '*')
    .then(([{ id }]) => {
      return knex('landmarks').then(landmarks => {
        const err = `Check that you've reset the auto-incrementing ID`
        expect(id, err).to.equal(landmarks.length)
      })
    })
    .catch((err) => Promise.reject(err))
  })
})
