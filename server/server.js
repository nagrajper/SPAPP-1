var express = require('express');
var db = require("mongojs").connect('SPAPP', ['groups', 'subgroups']);
var app = express();

// display Welcome message on homepage
// app.get('/', function(req, res) {
// 	res.send('Welcome to SPAPP');
// });

app.get('/groups', function(req, res) {
	console.log('Fetching groups');
	db.groups.find({}, function(err, docs) {
		var result={}; 
		var docsLength = docs.length;
		for(var i = 0; i < docsLength; i++ ) {
			var id = docs[i]._id.valueOf();
			id=id.toString();
			result[id] = docs[i].name;			
		}		
		res.send(JSON.stringify(result));		
	});
});

app.get('/subgroups', function(req, res) {
	console.log('Fetching subgroups');
	db.subgroups.find({}, function(err, docs) {
		var result={}; 
		var docsLength = docs.length;
		for(var i = 0; i < docsLength; i++ ) {
			var id = docs[i].groupId;
			id = id.toString();
			var index = 0;
			if (result[id]) {
				index = result[id].length
				result[id][index] = docs[i].name; 	
			} else {
				result[id] = [docs[i].name]; 
			}
						
		}		
		res.send(JSON.stringify(result));		
	});
});

app.get('/add/group/:groupName', function(req, res){	
	
	db.groups.save({'name' : req.params.groupName}, 
		function(err, saved) {
		  if( err || !saved ) console.log("Error");
		  else console.log("A new groups is added, thank you!");
		});

	res.send('Added new group');
});

app.get('/add/group/:groupId/subgroup/:subgroupName', function(req, res) {
	// add subgroup to parent
	db.subgroups.save({'groupId' : req.params.groupId, 'name' : req.params.subgroupName},
		function(err, saved) {
		  if( err || !saved ) console.log("Error");
		  else console.log('Added subgroup %s to %s', req.params.subgroupName, req.params.groupId);
		});

	res.send('Added new subgroup');
});

app.get('*', function(req, res) {
	console.log('Requested URL: ' + req.url);
	if (req.url == '/spapp.js') {
		 res.sendFile(req.url,	{'root': '__dirname/../frontend'});
	} else if ( !(req.url.match(/^\/templates/)== null) 
				|| !(req.url.match(/^\/lib/)== null)
				|| !(req.url.match(/^\/css/)== null) ) {
		 res.sendFile(req.url,	{'root': '__dirname/../frontend'});
	}else {
		res.sendFile('index.html',	{'root': '__dirname/../frontend'});
	}	
});

// server listens on port 8000
var server = app.listen(8000, function() {
	console.log('Server listening at http://%s:%s', 
		server.address().address,
		server.address().port);	
});
