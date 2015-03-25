app.config(['$routeProvider', function ($routeProvider){
	$routeProvider.when('/', {		
		//templateUrl: 'templates/listGroups.html',
		templateUrl: 'spapp/views/spapp.client.view.html',
		controller: 'ResultsController'
	}).when('/groupAdd', {		
		controller: 'groupAddController'
	}).when('/addSubgroup/:groupId', {
		templateUrl: 'spapp/views/spapp.client.addSubgroup.html',
		controller: 'subGroupAddController'
	}).otherwise({
		redirectTo: '/errorPage'
	});	
}]);