const fs = require('fs')
const path = require('path')

describe('Architects Table', function () {
  beforeEach(function () {
    this.config = { directory: path.join(__dirname, '..', '..', 'db', 'migrations') }
    return knex.migrate.latest(this.config).catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('creates the appropriate columns upon migration', function () {
    return knex('architects').columnInfo()
    .then((actual) => {
      const expected = {
        id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: 'nextval(\'architects_id_seq\'::regclass)'
        },

        name: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        },

        created_at: {
          type: 'timestamp with time zone',
          maxLength: null,
          nullable: false,
          defaultValue: 'now()'
        },

        updated_at: {
          type: 'timestamp with time zone',
          maxLength: null,
          nullable: false,
          defaultValue: 'now()'
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
    return knex.schema.hasTable('architects').then(beforeRollback => {
      return knex.migrate.rollback(this.config).then(() => {
        return knex.schema.hasTable('architects').then(afterRollback => {
          const err = `Check the down() function in your migration`
          expect(beforeRollback, err).to.be.true
          expect(afterRollback, err).to.be.false
        })
      })
    })
  })
})
