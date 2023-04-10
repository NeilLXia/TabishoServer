require('dotenv').config()
const { Pool } = require('pg')
// const pgp = require('pg-promise')();

const client = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.USERNAME,
  password: process.env.PASSWORD
})

// const client = pgPromise({
//   connectionString: process.env.PRODUCTS_DATABASE_URL,
// });

export default client

