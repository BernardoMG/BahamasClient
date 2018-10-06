const Client = require('./schema.js')

module.exports = function (req, res) {
  // store client in DB
  Client.findOne({ 'invoiceId': req.params.invoice })
    .then((client) => {
      if (client) {
        res.status(200).render('retrieve', {
          message: client
        })
      } else {
        res.status(404).send('Not Found.')
      }
    }).catch((err) => {
      console.log('Error when dealing with Mongo: ', err)
      res.status(500).send('Something went wrong.')
    })
}