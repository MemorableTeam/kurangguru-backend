const { Client } = require('pg')
require('dotenv').config()
const { DB_HOST, DB_PORT, DB_USER, DB_PW, DB_DB } = process.env

const clientOpt = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PW,
  database: DB_DB
}

const pg = new Client(clientOpt)
pg.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

module.exports = pg