exports.getDBConnection = function() {
	// get db connection
	var uri = 'mongodb://localhost/SPAPP';
	var db = require('mongoose').connect(uri);
	return db;
}