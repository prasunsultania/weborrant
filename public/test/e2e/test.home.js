'use strict';
var app = require('../../../app'), 
  chai = require('chai'), 
  chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect, 
  config = require('../protractor-config.js').config;

describe('weborrent homepage', function() {
  it('should load up homepage', function() {
    // Load our homepage.
    browser.get(config.baseUrl);
    
    //eventual expectations are cool
    expect(browser.getTitle()).to.eventually.equal('Weborrent');
    //browser.sleep(5000);
  });
});

