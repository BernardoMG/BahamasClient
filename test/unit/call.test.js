const externalCall = require('../../lib/mock')
const request = require('request')
const expect = require('chai').expect

const req = {
  params: {
    invoice: 1234
  },
  query: {
    fiscal_id: 9999,
    name: 'Bob',
    email: 'bob@bob.com'
  }
}

describe('Mock external call', function () {
  it('should make a call to bahamas website', function (done) {
    externalCall(req)
    request(`https://bahamas.gov/register?invoice=${req.params.invoice}&fiscal_id=${req.query.fiscal_id}&name=${req.query.name}&email=${req.query.email}`,
      { json: true },
      (err, res, body) => {
        expect(res.statusCode).to.equal(200)
        done()
      })
  })
})