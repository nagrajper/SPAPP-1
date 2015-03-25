var app = angular.module('SPAPP', ['ngRoute']);

app.service('sharedService', function () {
	var subGroups = {};
	return {
		getSubGroups: function () {
			return subGroups;
		},
		setSubGroups: function(value) {
			subGroups = value;
		}
	};
});

app.directive('displayhierarchy', function () {
	return {
		restrict: 'E',
		template: '<div>List of Groups and Subgroups</div>',
		replace: true
	};
}); 


app.controller('ResultsController', function ($scope, $http, $location, sharedService) {
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
		sharedService.setSubGroups($scope.subgroups);
	});
	

	// save a new group
	$scope.addNewGroup = function() {
		$scope.duplication = false;
		// prevent duplication
		for(var gname in $scope.groups) {
			console.log($scope.groupName + ' ' + $scope.groups[gname]);
			if($scope.groupName.toLowerCase() == $scope.groups[gname].toLowerCase())  {
				console.log('Duplicate detected');
				var duplication = true;
				$scope.duplication = true;
				break;
			}			
		}
				
		if(!duplication) {
			$http.get('/add/group/' + $scope.groupName).success(function(data) {		
				console.log('HI');

				$http.get('groups').success(function(data) {
					$scope.groups = data;					
				});			
			});
		}
	}

	// show add group form
	$scope.groupFormShown = false;
	$scope.showAddGroupForm = function() {
		$scope.groupFormShown = true;
	}

	
});

app.controller('subGroupAddController', function ($scope, $http, $routeParams, $location,sharedService) { 
	console.log('in subGroupAddController');
	$scope.groupId = $routeParams.groupId;
	// save subgroup for a group
	$scope.addSubGroup = function ($routeParams) {
		// prevent duplication of subgroups. (check case sensitivity)
		$scope.subduplication = false;
		var subGroups = sharedService.getSubGroups();
		for(var id in subGroups) {
			if(subGroups.hasOwnProperty(id)){
				var len = subGroups[id].length;
				for (var i=0; i < len; i++) {
					if (subGroups[id][i].toLowerCase() == $scope.subGroupName.toLowerCase()) {
						$scope.subduplication = true;
						break;
					}
				}				
			}
		}

		if(!$scope.subduplication) {
			console.log('Attempt to add ' 
				+ $scope.subGroupName + ' for Group: ' + $scope.groupId );

			$http.get('/add/group/' + $scope.groupId + '/subgroup/' + $scope.subGroupName)
			.success(function() {
				console.log('Subgroup added');
				$location.url('/');
			});
		}
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