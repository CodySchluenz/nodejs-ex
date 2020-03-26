import * as server from '../src/server';
let chai = require('chai');
let chaiHTTP = require('chai-http');
//import chai from 'chai';
//import chaiHTTP from 'chai-http'
let should = chai.should();


chai.use(chaiHTTP);

let reqServer = process.env.HTTP_TEST_SERVER || server

describe('Basic routes tests', function () {

    it('GET to / should return 200', function (done) {
        chai.request(reqServer)
            .get('/')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    })

    it('GET to /pagecount should return 200', function (done) {
        chai.request(reqServer)
            .get('/pagecount')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    })
})
