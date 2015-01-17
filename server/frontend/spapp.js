var app = angular.module('SPAPP', ['ngRoute']);

app.config(function ($routeProvider){
	$routeProvider.when('/', {
		controller: 'SPAPPController'
	});
});

app.directive('displayhierarchy', function () {
	return {
		restrict: 'E',
		template: '<div>Fetch data from DB here</div>',
		replace: true
	};
}); 

app.controller('SPAPPController', function ($scope) {
	$scope.siteName = 'SPAPP';
}); 

app.controller('ResultsController', function ($scope, $http) {
	console.log('RESULT');
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
});