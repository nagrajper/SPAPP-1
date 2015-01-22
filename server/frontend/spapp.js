var app = angular.module('SPAPP', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider){
	$routeProvider.when('/', {		
		//templateUrl: 'templates/listGroups.html',
		templateUrl: 'templates/groupAdd.html',
		controller: 'ResultsController'
	}).when('/groupAdd', {		
		controller: 'groupAddController'
	}).when('/addSubgroup/:groupId', {
		templateUrl: 'templates/addSubgroup.html',
		controller: 'subGroupAddController'
	}).otherwise({
		redirectTo: '/errorPage'
	});	
}]);

app.directive('displayhierarchy', function () {
	return {
		restrict: 'E',
		template: '<div>List of Groups and Subgroups</div>',
		replace: true
	};
}); 


app.controller('ResultsController', function ($scope, $http, $location) {
	console.log('in ResultsController');
	var result = '';

	$scope.siteName = 'SPAPP';
	// fetch groups
	$http.get('groups').success(function(data) {
		// data = {	"54b2293967e1a0d417fafc2b":"Arts",
		//		   	"54b238522b9c0bcc0c08ade9":"sports",
		//			"54b23a912b9c0bcc0c08adea":"culture"}
		$scope.groups = data;
	});

	// fetch subgroups
	$http.get('subgroups').success(function(data) {
		$scope.subgroups = data;
	});

	// save a new group
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

	// show add group form
	$scope.groupFormShown = false;
	$scope.showAddGroupForm = function() {
		$scope.groupFormShown = true;
	}

	
});

app.controller('subGroupAddController', function ($scope, $http, $routeParams, $location) { 
	console.log('in subGroupAddController');
	$scope.groupId = $routeParams.groupId;
	// save subgroup for a group
	$scope.addSubGroup = function ($routeParams) {
		//$scope.groupId = $routeParams.groupId;

		console.log('Attempt to add ' 
			+ $scope.subGroupName + ' for Group: ' + $scope.groupId );

		$http.get('/add/group/' + $scope.groupId + '/subgroup/' + $scope.subGroupName)
		.success(function() {
			console.log('Subgroup added');
			$location.url('/');
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