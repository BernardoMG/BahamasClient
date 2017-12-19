const express = require('express')
const mongoose = require('mongoose')
const dbUrl = require('./config/database')
const serverConfig = require('./config/server')
const routes = require('./config/routes')

let url = ''
if (process.env.NODE_ENV) {
  url = dbUrl.test
} else (
  url = dbUrl.default
)

const app = express()
app.set('view engine', 'pug')
const options = { useMongoClient: true }
mongoose.Promise = global.Promise;
mongoose.connect(url, options, function (error) {
  // Check error in initial connection.
  if (error) {
    console.log('Could not connect to mongo server!')
    return process.exit(error)
  }
})
routes(app)

app.listen(serverConfig.port, () => {
  console.log(`Client from bahamas challenge running on ${serverConfig.port}`)
})

module.exports = app