require('dotenv').load()
const knex = require('../db/connection')
const name = `${process.env.DATABASE_NAME}_dev`

const italy = { name: 'Italy', population: 59359900 }

// Before you can run the code below, you must run your migrations
knex('countries').insert(italy, '*')
.then(rows => {
  console.log(rows)
  return knex('countries').delete().then(() => knex.destroy())
}).catch(err => {
  console.log(err)
  knex.destroy()
})
