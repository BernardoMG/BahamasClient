const mongoose = require('mongoose')

// define the schema for our client model
let client = mongoose.Schema({
  invoiceId: Number,
  fiscalNumber: Number,
  name: String,
  email: String
})

// create the model for clients and expose it to our app
module.exports = mongoose.model('Client', client)
