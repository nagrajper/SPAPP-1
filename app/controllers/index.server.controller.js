var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('SPAPP', server, {w:1});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'SPAPP' database");       
    } else {
    	console.log("ERROR: Not connected to DB");
    }
});

exports.render = function(req, res) {

	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}

	req.session.lastVisit = new Date();

	res.render('index', {
		title : 'Hello World'
	})
};

exports.findAllGroups = function(req, res) {
	db.collection('groups', function(err, collection) {
        collection.find().toArray(function(err, items) {
        	var result={}; 
        	var docsLength = items.length;
        	for(var i = 0; i < docsLength; i++ ) {
        		var id = items[i]._id.valueOf();
        		id=id.toString();
        		result[id] = items[i].name;			
        	}		
        	res.send(JSON.stringify(result));            
        });
    });    
};

exports.findAllSubGroups = function(req, res) {
	db.collection('subgroups', function(err, collection) {
        collection.find().toArray(function(err, items) {
        	var result={}; 
    		var docsLength = items.length;
    		for(var i = 0; i < docsLength; i++ ) {
    			var id = items[i].groupId;
    			id = id.toString();
    			var index = 0;
    			if (result[id]) {
    				index = result[id].length
    				result[id][index] = items[i].name; 	
    			} else {
    				result[id] = [items[i].name];
    			}
    						
    		}		
    		res.send(JSON.stringify(result));        
        });
    });    
};

exports.addGroup = function(req, res) {
	db.collection('groups', function(err, collection) {
		var document = {'name' : req.params.groupName};
		collection.insert(document, {w: 1}, function(err, records){
			console.log("A new groups is added, thank you!");
			res.send(JSON.stringify({"result": "success"}));
		});
	});	
}

exports.addSubGroup = function(req, res) {
	db.collection('subgroups', function(err, collection) {
		var document = {'groupId' : req.params.groupId, 'name' : req.params.subgroupName};
		collection.insert(document, {w: 1}, function(err, records){
			console.log('Added subgroup %s to %s', req.params.subgroupName, records[0]._id);
			res.send(JSON.stringify({"result": "success"}));
		});
	});
	
	
};

exports.findGroupById = function(req, res) {    
	db.collection('groups', function(err, collection) {
        collection.findOne({_id: new BSON.ObjectID(req.params.id)}, function(err, items) {
            res.send(items);
        });
	});
	
};


