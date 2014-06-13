var portNum = process.env.NODEJS_PORT || 8080;

exports.config = {
  
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  allScriptsTimeout: 11000,
  specs: ['e2e/*.js'],

  multiCapabilities: [  
    /*{'browserName': 'IE'},
    {'browserName': 'firefox'},*/
    {'browserName': 'chrome', 
    	'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'Protractor SignIn-Signout Test'}/*,
    {'browserName': 'safari'}*/
  ],

  /*replace it with correct url while running test*/
  //baseUrl: 'http://prasun.io/',
  baseUrl: 'http://login.localhost.in:' + portNum,

  framework: 'mocha' 
};
