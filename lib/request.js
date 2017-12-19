const request = require('request')

module.exports = function (req) {
  request(`https://bahamas.gov/register?invoice=${req.params.invoice}&fiscal_id=${req.query.fiscal_id}&name=${req.query.name}&email=${req.query.email}`,
    { json: true },
    (err, res, body) => {
      if (err) { return console.log(err) }
    })
}