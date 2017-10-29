const fs = require('fs')
const path = require('path')

describe('Alter Countries Table', function () {
  beforeEach(function () {
    this.config = { directory: path.join(__dirname, '..', 'db', 'migrations') }
    return knex.raw(schema)
    .then(() => knex.migrate.latest(this.config))
    .catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('removes government_type from the table', function () {
    return knex('countries').columnInfo()
    .then((actual) => {
      const expected = {
        id: {
          type: 'integer',
          maxLength: null,
          nullable: false,
          defaultValue: 'nextval(\'countries_id_seq\'::regclass)'
        },

        name: {
          type: 'character varying',
          maxLength: 255,
          nullable: false,
          defaultValue: '\'\'::character varying'
        }
      }

      for (const column in expected) {
        const err = `Column ${column} is not the same`
        expect(actual[column]).to.deep.equal(expected[column], err)
      }

      expect(actual).to.deep.equal(expected)
    })
    .catch((err) => Promise.reject(err))
  })

  it('correctly rolls back the migration', function () {
    return knex('countries').columnInfo().then(beforeColumns => {
      return knex.migrate.rollback(this.config).then(() => {
        return knex('countries').columnInfo().then(afterColumns => {
          const expected = {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          }
          const err = `Check the down() function in your migration`
          expect(beforeColumns.government_type, err).to.be.undefined
          expect(afterColumns.government_type, err).to.deep.equal(expected)
        })
      })
    })
  })
})
