var express = require('./config/express');
	//connection = require('./config/db');

var app = express();
app.listen(3000);
//module.exports = app;

//var db = connection.getDBConnection();

console.log('Server running at http://localhost:3000/');


//http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/