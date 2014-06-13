var express = require('express');

var vhost = require('vhost'),
	bodyParser = require('body-parser');


// load env
require('./utils/loadenv')();

var Weborrent = function() {
  var app = express();  

  // Scope.
  var self = this;

  /**
   * terminator === the termination handler Terminate server on receipt of the
   * specified signal.
   * 
   * @param {string}
   *          sig Signal to terminate on.
   */
  self.terminator = function(sig) {
    if (typeof sig === "string") {
      console.log('%s: Received %s - terminating sample app ...', Date(Date
          .now()), sig);
      process.exit(1);
    }
    console.log('%s: Node server stopped.', Date(Date.now()));
  };

  /**
   * Setup termination handlers (for exit and a list of signals).
   */
  self.setupTerminationHandlers = function() {
    // Process on exit and signals.
    process.on('exit', function() {
      self.terminator();
    });
    [ 'SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS',
        'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM' ]
        .forEach(function(element, index, array) {
          process.on(element, function() {
            self.terminator(element);
          });
        });
  };

  self.logUncaughtExceptions = function() {
    process.on('uncaughtException', function(ex) {
      console.dir(ex);      
    });
  };

  self.initializeServer = function() {                   
            
      app.use(bodyParser());                  
      require('./routes/index')(app, __dirname);                 

      app.use(vhost('www.weborrent.com', app))
      .use(vhost('weborrent.herokuapp.com', app));           

      app.listen(process.env.NODEJS_PORT || 
          process.env.OPENSHIFT_NODEJS_PORT || 
          process.env.PORT, process.env.NODEJS_IP || 
          process.env.OPENSHIFT_NODEJS_IP);
      console.log('%s: Node server started on %s:%s ...', Date(Date.now()),
          process.env.NODEJS_IP || 
          process.env.OPENSHIFT_NODEJS_IP || 
          '127.0.0.1', 
          process.env.NODEJS_PORT ||
          process.env.OPENSHIFT_NODEJS_PORT);    
  };

  self.initialize = function(callback) {
    self.logUncaughtExceptions();
    self.setupTerminationHandlers();
    self.initializeServer();
  };

};

var Weborrent = new Weborrent();
Weborrent.initialize();