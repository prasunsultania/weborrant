var PublicFilesServer = require('../utils/servepublicfiles');

module.exports = function(app, rootDir) {

  app.set('views', rootDir + '/views');
  app.set('view engine', 'ejs');
    
  app.get("/", function(req, res){
	  res.render("home.ejs", {"NODE_ENV": process.env.NODE_ENV});
  });

  // Handle public resources
  app.get(/\/(libs)|(partials)|(img)|(js)|(jsmin)|(css)\/.+/,
		  PublicFilesServer.getResource);
  
  app.get('*', PublicFilesServer.getResource);
};