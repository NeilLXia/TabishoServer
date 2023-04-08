require('dotenv').config()
const express = require("express")
const cors = require("cors")
const router = require("./router")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

app.use('/qa', router)

const port = process.env.SERVER_PORT
const appInstance = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

module.exports = appInstance