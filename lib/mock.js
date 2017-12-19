var nock = require('nock')

module.exports = function (req) {
  const bahamasCall = nock('https://bahamas.gov')
    .get(`/register?invoice=${req.params.invoice}&fiscal_id=${req.query.fiscal_id}&name=${req.query.name}&email=${req.query.email}`)
    .reply(200)
}
