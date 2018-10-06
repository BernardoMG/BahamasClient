const server = require('../../app')
const db = require('../../config/database')
const expect = require('chai').expect
const request = require('supertest')
const mongoose = require('mongoose')

describe('Store clients', function () {
  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      done()
    })
  })

  it('should store the invoice', function (done) {
    request(server)
      .get('/store-bahamas-client/1234?fiscal_id=999999999&name=Bob&email=bob@bob.com')
      .end(function (err, res) {
        expect(res.statusCode).to.equal(200)
        done();
      })
  })

  it('should not store duplicate invoice', function (done) {
    request(server)
      .get('/store-bahamas-client/1234?fiscal_id=999999999&name=Bob&email=bob@bob.com')
      .end(function (err, res) {
        expect(res.statusCode).to.equal(409)
        done();
      })
  })

  it('should return a bad request', function (done) {
    request(server)
      .get('/store-bahamas-client/1234?fiscal_id=999999999&name=Bob&email=')
      .end(function (err, res) {
        expect(res.statusCode).to.equal(400)
        done();
      })
  })
})

