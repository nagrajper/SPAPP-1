var app = angular.module('SPAPP', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider){
	$routeProvider.when('/', {		
		//templateUrl: 'templates/listGroups.html',
		templateUrl: 'templates/groupAdd.html',
		controller: 'ResultsController'
	}).when('/groupAdd', {
		
		controller: 'groupAddController'
	}).otherwise({
		redirectTo: '/errorPage'
	});
}]);

app.directive('displayhierarchy', function () {
	return {
		restrict: 'E',
		template: '<div>Fetch data from DB here</div>',
		replace: true
	};
}); 

/*app.controller('SPAPPController', function ($scope) {
	console.log('in SPAPPController');
	$scope.siteName = 'SPAPP';
}); 
*/
app.controller('ResultsController', function ($scope, $http, $location) {
	console.log('in ResultsController');
	var result = '';
	$http.get('groups').success(function(data) {
		// data = {	"54b2293967e1a0d417fafc2b":"Arts",
		//		   	"54b238522b9c0bcc0c08ade9":"sports",
		//			"54b23a912b9c0bcc0c08adea":"culture"}
		
		/*for (var i in data) {
			//result += '<div id="' + i + '">' + data[i]+ '</div>';
			result += data[i];
		}*/
		$scope.groups = data;
	});

	// fetch subgroups
	$http.get('subgroups').success(function(data) {
		$scope.subgroups = data;
	});

	$scope.addNewGroup = function() {
		$http.get('/add/group/' + $scope.groupName).success(function(data) {		
			console.log('HI');

			$http.get('groups').success(function(data) {
				$scope.groups = data;
				console.log('HELLO' + $scope.groups);
				$location.url('/');
			});			
		});		
	}
});
/*
app.controller('groupAddController', function ($scope, $location, $http) {
	console.log('in groupAddController');
	$scope.addNewGroup = function() {
		$http.get('/add/group/' + $scope.groupName).success(function(data) {		
			console.log('HI');

			$http.get('groups').success(function(data) {
				$scope.groups = data;
				console.log('HELLO' + $scope.groups);
				$location.url('/');
			});			
		});		
	}
});*/