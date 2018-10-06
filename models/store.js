const Client = require('./schema.js')
const externalCall = require('../lib/mock')
const httpRequest = require('../lib/request')

module.exports = function (req, res) {
  // store client in DB
  let flag = false
  externalCall(req)
  Client.findOne({ 'invoiceId': req.params.invoice })
    .then((client) => {
      if (!client) {
        const newClient = new Client({
          invoiceId: req.params.invoice,
          fiscalNumber: req.query.fiscal_id,
          name: req.query.name,
          email: req.query.email
        })
        newClient.save()
        flag = true
      }
      return flag
    }).then(() => {
      if (flag) {
        httpRequest(req)
        res.status(200).render('store', {
          message: 'Invoice stored with success.'
        })
      } else {
        res.status(409).render('store', {
          message: 'Invoice already exits.'
        })
      }
    }).catch((err) => {
      console.log('Error when dealing with Mongo: ', err)
      res.status(500).send('Something went wrong.')
    })
}