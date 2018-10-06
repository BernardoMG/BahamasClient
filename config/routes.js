const joi = require('joi')
const store = require('../models/store')
const retrieve = require('../models/retrieve')
const storeUrl = require('./urlStore')
const retrieveUrl = require('./urlRetrieve')

module.exports = function (app) {
  // store client endpoint
  // get method because the query string is sent in the URL
  // should be a post method  
  app.get('/store-bahamas-client/:invoice', function (req, res) {
    joi.validate({
      invoice: req.params.invoice,
      fiscal_id: req.query.fiscal_id,
      name: req.query.name,
      email: req.query.email
    }, storeUrl, function (err, value) {
      if (err) {
        res.status(400).send('Bad Request.')
      } else {
        store(req, res)
      }
    })
  })

  // retrieve client endpoint
  app.get('/retrieve-bahamas-client/:invoice', function (req, res) {
    joi.validate({
      invoice: req.params.invoice
    }, retrieveUrl, function (err, value) {
      if (err) {
        res.status(400).send('Bad Request.')
      } else {
        retrieve(req, res)
      }
    })
  })

  app.all('*', function (req, res) {
    res.status(404).send('Route not available.')
  })
}
