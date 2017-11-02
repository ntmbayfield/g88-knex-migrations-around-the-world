require('dotenv').load()
const knex = require('../db/connection')
const name = `${process.env.DATABASE_NAME}_dev`

// Before you can run the code below, you must run your migrations
knex('countries')
.then(rows => {
  console.log(rows)
  return knex('countries').delete().then(() => knex.destroy())
}).catch(err => {
  console.log(err)
  knex.destroy()
})
