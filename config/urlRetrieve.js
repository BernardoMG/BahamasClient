const joi = require('joi')

// define the retrieve url schema
const retrieveUrl = joi.object().keys({
  invoice: joi.number().required()
})

module.exports = retrieveUrl
