var users = require('./controllers/people');

var app = angular.module('main-app',['ngRoute']);

app.config(function($routeProvider){
	
	$routeProvider
	.when ('/', {
		templateUrl: 'login/login.pug'
	})
	.when('/api/login',{
		templateUrl: 'login/login.pug'
	})
	
});

app.controller('loginCtrl',['$scope', function($scope){
	$scope.submit = function(){

		console.log("HEllo world");
		
		var first = $scope.first;
		var last = $scope.last; 
		var username = $scope.username;
		var password = $scope.password;
		var email= $scope.email;

		var body = 
		{
			"First": first,
			"Last": last,
			"Username": username,
			"Password": password,
			"Email": email
		}
		
		 
		users.body = body;

		


	};
}]);