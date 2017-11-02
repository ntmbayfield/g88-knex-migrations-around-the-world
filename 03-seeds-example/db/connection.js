const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile.js')[env]
const knex = require('knex')

module.exports = knex(config)
