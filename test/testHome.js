var app = require('../app');
var request = require('./utils/request');
var expect = require('chai').expect;

describe('test Home',
    function() {
      before(function(done) {
        // give server time to start
    	setTimeout(done, 3000);
        console.log(process.env.NODE_ENV);          
      });

      describe('/', function() {
        it('should give a response', function(done) {
          var reqClient = new request();
          reqClient.request({
            url : 'http://localhost:' + process.env.NODEJS_PORT
          }).then(function(res) {
            expect(res).to.not.equal('null');
            expect(res).to.not.equal('undefined');
            var body = res.getBody().toString();
            expect(body).to.not.equal('null');
            expect(body).to.not.equal('undefined');
            done();
          }, function() {
            console.log('test failed');
            expect(true).to.equal(false);
            done();
          });
        });
      });
            
    });