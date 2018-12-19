var app = angular.module("main-app", []);
app.controller("postController", function($scope, $http) {
$scope.postArray = [];
$scope.postLoader = function() {
  $http.get('posts/').then(function(response) {
    $scope.postArray = response.data
  })
}
$scope.postLoader();

$scope.updatePost = function(id, type) {
  var data = $.param({type: type});
  $http.put('./post/'+id+'?'+data).then(function(response) {
    $scope.dummy = response.data;
  });
}
});

/*
  script.
  var app = angular.module("main-app", []);
  app.controller("postController", function($scope, $http, $log) {
    $scope.postArray = [];
    $scope.postLoader = function() {
      $http.get('posts/').then(function(response) {
        $scope.postArray = response.data
      })
    }
    $scope.postLoader();

    $scope.updatePost = function(id, type) {
      console.log(id + " " + type);
      //var data = $.param({type: type});
      $http(
        method: 'PUT',
        url: './post/'+id,
        data: type).then(function(response) {
        $scope.dummy = response.data;
      }).catch(function(err) {
        $log.debug(err);
      });
    }
  });
  */