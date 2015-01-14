var app = angular.module('SPAPP', ['ngRoute']);

app.config(function ($routeProvider){
	$routeProvider.when('/', {
		controller: 'SPAPPController'
	});
});

app.controller('SPAPPController', function ($scope, $http) {
	$scope.siteName = 'SPAPP';
}); 