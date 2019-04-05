'use strict';

//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let Validators = require('../api/v1/models/validators')

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)
//Our parent block
describe('Validators', () => {
	beforeEach((done) => { 
		done()         
    })

    afterEach((done) => {
        done()
    })
 /*
  * Test the /GET route
  */
  describe('/GET ALL validators', () => {
      it('It should GET all the validators', (done) => {
        chai.request(server)
            .get('/api/v1/validators')
            .end((err, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.should.have.property('result')
                  res.body.result.should.have.property('block_height')
                  res.body.result.should.have.property('validators')
                  res.body.result.validators.should.be.a('array')
                  res.body.result.validators.length.should.be.eql(14)
                  res.body.result.validators[0].should.have.property('address')
                  res.body.result.validators[0].should.have.property('pub_key')
              done()
            })
      })
  })

  describe('/GET ONE validator', () => {
      it('It should GET one the validator with address is 0DAB679E5C4DB1F407F3B79FDBD1D5DE4AD054D9', (done) => {
        chai.request(server)
            .get('/api/v1/validators/0DAB679E5C4DB1F407F3B79FDBD1D5DE4AD054D9')
            .end((err, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.should.have.property('validator')
                  res.body.validator.should.have.property('address')
                  res.body.validator.should.have.property('pub_key')
                  res.body.validator.should.have.property('voting_power')
                  res.body.validator.address.should.be.eql('0DAB679E5C4DB1F407F3B79FDBD1D5DE4AD054D9')
              done()
            })
      })
  })

  describe('/GET ONE Invalid validator', () => {
      it('It should GET one Invalid validator with address is ABCXYZ', (done) => {
        chai.request(server)
            .get('/api/v1/validators/ABCXYZ')
            .end((err, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.should.not.have.property('validator')
              done()
            })
      })
  })

  describe('/POST validator', () => {
      it('It should POST validator with address is 0DAB679E5C4DB1F407F3B79FDBD1D5DE4AD054D9 and UPDATE voting_power 1234567800000000', (done) => {

      	let validator = { address: "0DAB679E5C4DB1F407F3B79FDBD1D5DE4AD054D9",
      		pub_key: {type: "tendermint/PubKeyEd25519",value: "OtQ6fErTMHtOZA40G2jMa8mTQmwmOrV0J5IR47CoUKiw="},
      		voting_power: 1234567800000000,
      		proposer_priority: "-28471297322249822" }

        chai.request(server)
            .post('/api/v1/validators')
            .send(validator)
            .end((err, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.should.have.property('message')
              done()
            })
      })
  })

  describe('/POST validator', () => {
      it('It should POST validator and CREATE new one ', (done) => {

      	let validator = { address: "XXXXXXXXXX4DB1F407F3B79FDBD1D5DE4AD054D9",
      		pub_key: {type:"tendermint/PubKeyEd25519",value:"XXXXXXXXXXtOZA40G2jMa8mTQmwmOrV0J5IR47CoUKiw="},
      		voting_power: 87654321800000000,
      		proposer_priority: "12345678322249822" }

        chai.request(server)
            .post('/api/v1/validators')
            .send(validator)
            .end((err, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.should.have.property('message')
              done()
            })
      })
  })

})