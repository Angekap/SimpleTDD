var express = require('express');
var reload = require('reload');
var app = express();


//Listening to available port from environment variable
//If no environment variable is set, use port 5000 as default
app.set('port', process.env.PORT || 5000);

/*
  Setup viewing engine - ejs (embedddable Javascript)
*/
app.set('view engine', 'ejs');
app.set('views', './src/views'); //setup views location

/*
  Create a global variable that can is available to any of my routes (pages)
*/
app.locals.siteTitle = 'Simple TDD ';
// app.locals.allSpeakers = featureFile.speakers;

/*
  Express middleware - express.static:
  method used to setup a folder for holding files that I want the use or routes to have access to.
  This is accessible through the root.
*/
app.use(express.static('src/public/assets'));

/*
  It is not practical to have all routes in a single file. Thus creating separate routes (modularizing my routes) is more advantageous.
*/
app.use(require('./src/routes/index'));

var server = app.listen(app.get('port'), function(){
  console.log('Listening on port ' + app.get('port'));
});

reload(server, app);
