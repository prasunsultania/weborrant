var fs = require('fs');
var mime = require('mime');
var PUBLIC_FOLDERS_FILES = [ '/libs', '/css', '/js', '/img', '/partials',
    '/index.html', '/jsmin' ];

var PublicFilesServer = {};

PublicFilesServer.getFile = function(key) {

  PublicFilesServer.getFile.__cache = PublicFilesServer.getFile.__cache || {};

  var file = PublicFilesServer.getFile.__cache[key], 
    match = false;

  if (key.indexOf('/') !== 0) {
    key = key + "/";
  }

  PUBLIC_FOLDERS_FILES.forEach(function(startsWith) {
    if (key.indexOf(startsWith) === 0) {
      match = true;
    }
  });

  if (!match) {
    return null;
  }

  if (!file) {
    try {
      file = fs.readFileSync('./public' + key);
      PublicFilesServer.getFile.__cache[key] = file;
    } catch (ex) {
      console.log('An error occurred while reading the file');
      console.dir(ex);
      return null;
    }
  }
  return PublicFilesServer.getFile.__cache[key];
};

PublicFilesServer.getResource = function(req, res) {
  var reqRoute = req.url.replace(/\?.*$/, '');
  reqRoute = reqRoute === '/' ? '/index.html' : reqRoute;  
  var file = PublicFilesServer.getFile(reqRoute);

  if (!file) {
    return res.send("Page Not found", 404);
  }

  res.setHeader('Content-Type', mime.lookup('.' + reqRoute));
  res.send(file);
};

module.exports = PublicFilesServer;