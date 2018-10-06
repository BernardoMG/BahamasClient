const server = require('../../app')
const expect = require('chai').expect
const request = require('supertest')
const mongoose = require('mongoose')


describe('Retrieve clients', function () {
  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      done()
    })
  })

  it('should retrieve the invoice', function (done) {
    request(server)
      .get('/store-bahamas-client/9191?fiscal_id=999999999&name=Bob&email=bob@bob.com')
      .end(function (err, res) {
        request(server)
          .get('/retrieve-bahamas-client/9191')
          .end(function (err, res) {
            expect(res.statusCode).to.equal(200)
            done();
          })
      })
  })

  it('should return a not found invoice message', function (done) {
    request(server)
      .get('/retrieve-bahamas-client/1199')
      .end(function (err, res) {
        expect(res.statusCode).to.equal(404)
        done();
      })
  })

  it('should return a bad request', function (done) {
    request(server)
      .get('/retrieve-bahamas-client/exploit')
      .end(function (err, res) {
        expect(res.statusCode).to.equal(400)
        done();
      })
  })
})