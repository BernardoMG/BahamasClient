const joi = require('joi')

// define the store url schema
const storeUrl = joi.object().keys({
  invoice: joi.number().required(),
  fiscal_id: joi.number().required(),
  name: joi.string().required(),
  email: joi.string().email().required()
}).with('invoice', 'fiscal_id', 'name', 'email')

module.exports = storeUrl
