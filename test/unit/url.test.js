const joi = require('joi')
const expect = require('chai').expect
const storeUrl = require('../../config/urlStore')
const retrieveUrl = require('../../config/urlRetrieve')

const reqValid = {
  params: {
    invoice: 1234
  },
  query: {
    fiscal_id: 9999,
    name: 'Bob',
    email: 'bob@bob.com'
  }
}

const reqInvalid = {
  params: {
    invoice: "exploit"
  },
  query: {
    fiscal_id: 9999,
    name: 'Bob',
    email: 'bob@bob.com'
  }
}

describe('URL params validation', function () {
  describe('Store endpoint', function () {
    it('should consider a valid URL', function (done) {
      joi.validate({
        invoice: reqValid.params.invoice,
        fiscal_id: reqValid.query.fiscal_id,
        name: reqValid.query.name,
        email: reqValid.query.email
      }, storeUrl, function (err, value) {
        expect(value.invoice).to.equal(reqValid.params.invoice)
        expect(value.fiscal_id).to.equal(reqValid.query.fiscal_id)
        expect(value.name).to.equal(reqValid.query.name)
        expect(value.email).to.equal(reqValid.query.email)
        done()
      })
    })

    it('should consider a invalid URL', function (done) {
      const error = '"invoice" must be a number'
      joi.validate({
        invoice: reqInvalid.params.invoice,
        fiscal_id: reqValid.query.fiscal_id,
        name: reqValid.query.name,
        email: reqValid.query.email
      }, storeUrl, function (err, value) {
        expect(err.details[0].message).to.equal(error)
        done()
      })
    })
  })

  describe('Retrieve endpoint', function () {
    it('should consider a valid URL', function (done) {
      joi.validate({
        invoice: reqValid.params.invoice
      }, retrieveUrl, function (err, value) {
        expect(value.invoice).to.equal(reqValid.params.invoice)
        done()
      })
    })

    it('should consider a invalid URL', function (done) {
      const error = '"invoice" must be a number'
      joi.validate({
        invoice: reqInvalid.params.invoice
      }, retrieveUrl, function (err, value) {
        expect(err.details[0].message).to.equal(error)
        done()
      })
    })
  })
})