require('dotenv').config()
const { Pool } = require('pg')

const client = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.USERNAME,
  password: process.env.PASSWORD
})

export default client

