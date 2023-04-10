require('dotenv').config()
const express = require("express")
const cors = require("cors")
const router = require("./router")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

app.get('/loaderio-8d5bccc085ee6e2451f5b39778bd6c9a', (req, res) => {
  res.send("loaderio-8d5bccc085ee6e2451f5b39778bd6c9a")
})
app.use('/qa', router)

const port = process.env.SERVER_PORT
const appInstance = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

module.exports = appInstance