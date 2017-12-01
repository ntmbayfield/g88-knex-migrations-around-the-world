const fs = require('fs')
const path = require('path')

describe('Alter Continents Table', function () {
  beforeEach(function () {
    this.config = { directory: path.join(__dirname, '..', 'db', 'migrations') }
    return knex.raw(schema)
    .then(() => knex.migrate.latest(this.config))
    .catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('adds timestamps to the table', function () {
    return knex('continents').columnInfo()
    .then((actual) => {
      const expected = {
        id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: 'nextval(\'continents_id_seq\'::regclass)'
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
    return knex('continents').columnInfo().then(beforeColumns => {
      return knex.migrate.rollback(this.config).then(() => {
        return knex('continents').columnInfo().then(afterColumns => {
          const err = `Check the down() function in your migration`
          expect(beforeColumns.created_at, err).to.be.ok
          expect(beforeColumns.updated_at, err).to.be.ok
          expect(afterColumns.created_at, err).to.be.undefined
          expect(afterColumns.updated_at, err).to.be.undefined
        })
      })
    })
  })
})
