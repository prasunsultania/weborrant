// Karma config details: http://karma-runner.github.io/0.12/config/configuration-file.html 
module.exports = function(config) {
  var customLaunchers = null, browsers = null, plugins;

  if (process.env.TRAVIS_BUILD_NUMBER) {
    customLaunchers = {
      sl_chrome : {
        base : 'SauceLabs',
        browserName : 'chrome',
        platform : 'Windows 7'
      },
      sl_firefox : {
        base : 'SauceLabs',
        browserName : 'firefox',
        version : '27'
      },
      sl_ie_11 : {
        base : 'SauceLabs',
        browserName : 'internet explorer',
        platform : 'Windows 8.1',
        version : '11'
      }
    };
    browsers = Object.keys(customLaunchers);
    plugins = [ 'karma-sauce-launcher', 'karma-mocha', 'karma-chai',
        'karma-junit-reporter', 'karma-coverage' ];
  } else {
    browsers = [ 'Chrome', 'Firefox', 'IE' ];
    plugins = [ 'karma-chrome-launcher', 'karma-firefox-launcher',
        'karma-ie-launcher', 'karma-mocha', 'karma-chai',
        'karma-junit-reporter', 'karma-coverage' ];
  }

  config
      .set({
        sauceLabs : {
          startConnect : false,
          testName : 'Awesome Blog Front End Unit tests',
          build : process.env.TRAVIS_BUILD_NUMBER,
          tunnelIdentifier : process.env.TRAVIS_JOB_NUMBER
        },

        port : 3000,

        basePath : '../',

        files : [ '../public/libs/angular/angular.js',
            '../public/libs/angular-route/angular-route.js',
            '../public/libs/angular-mocks/angular-mocks.js',
            '../node_modules/sinon/lib/sinon.js', 'js/**/*.js',
            'test/unit/**/*.js' ],

        autoWatch : false,

        frameworks : [ 'mocha', 'chai' ],

        customLaunchers : customLaunchers,

        browsers : browsers,

        plugins : plugins,

        preprocessors : {
          'js/**/*.js' : 'coverage'
        },

        singleRun : true,

        reporters : [ 'coverage', 'junit', 'progress', 'saucelabs' ],

        coverageReporter : {
          type : 'lcov',
          dir : 'test/coverage/'
        },

        junitReporter : {
          outputFile : 'test/testres/unit.xml',
          suite : 'unit'
        }

      });
};