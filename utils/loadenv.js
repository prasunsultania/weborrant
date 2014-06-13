module.exports = function() {
  try {
    var env = require('../.env.js');
    Object.keys(env).forEach(function(key) {
      process.env[key] = env[key];
    });
  } catch (ex) {
    // DO NOTHING
    console.log(ex.message);
    console
        .log('[WARN]: env file does not exists, make sure env variables are set in your machine');
  }
};