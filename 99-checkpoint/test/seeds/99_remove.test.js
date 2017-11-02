const fs = require('fs')
const path = require('path')

xdescribe('Remove Seeds', function () {
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

  it('drops all the data before re-creating it', function () {
    return Promise.all([
      knex('cities'),
      knex('architects'),
      knex('landmarks'),
      knex('architects_landmarks')
    ]).then(([
      cities,
      architects,
      landmarks,
      architectsGovernments
    ]) => {
      return knex.seed.run(this.config.seeds).then(() => {
        return Promise.all([
          knex('cities'),
          knex('architects'),
          knex('landmarks'),
          knex('architects_landmarks')
        ]).then(([
          citiesNew,
          architectsNew,
          landmarksNew,
          architectsGovernmentsNew
        ]) => {
          expect(cities.length).to.equal(citiesNew.length)
          expect(architects.length).to.equal(architectsNew.length)
          expect(landmarks.length).to.equal(landmarksNew.length)
          expect(architectsGovernments.length).to.equal(architectsGovernmentsNew.length)
        })
      })
    })
    .catch((err) => Promise.reject(err))
  })
})
