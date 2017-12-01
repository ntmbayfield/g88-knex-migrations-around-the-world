const fs = require('fs')
const path = require('path')

describe('Architects And Landmarks Join Table', function () {
  beforeEach(function () {
    this.config = { directory: path.join(__dirname, '..', '..', 'db', 'migrations') }
    return knex.migrate.latest(this.config).catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('creates the appropriate columns upon migration', function () {
    return knex('architects_landmarks').columnInfo()
    .then((actual) => {
      const expected = {
        architect_id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: null
        },
        landmark_id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: null
        }
      }

      for (const column in expected) {
        const err = `Column ${column} is not the same`
        expect(actual[column].type).to.equal(expected[column].type, err)
        expect(actual[column].nullable).to.equal(expected[column].nullable, err)
      }
    })
    .catch((err) => Promise.reject(err))
  })

  it('correctly rolls back the migration', function () {
    return knex.schema.hasTable('architects_landmarks').then(beforeRollback => {
      return knex.migrate.rollback(this.config).then(() => {
        return knex.schema.hasTable('architects_landmarks').then(afterRollback => {
          const err = `Check the down() function in your migration`
          expect(beforeRollback, err).to.be.true
          expect(afterRollback, err).to.be.false
        })
      })
    })
  })
})
