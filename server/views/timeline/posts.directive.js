(function() {
    'use strict';
  
    angular
      .module('main-app')
      .directive('posts', postsDirective);
  
    /** @ngInject */
    function postsDirective() {
      var directive = {
        restrict: 'E',
        bindToController: true,
        templateUrl: 'views/timeline/posts.pug',
        controller: PostController,
        controllerAs: 'post_controller'
      };
  
      return directive;
  
      /** @ngInject */
      function PostController($log, $http) { // Used to be postService
        var vm = this;
        vm.postArray = [];

        vm.onLoad = function() {
          $http.get('posts/').then(function(response) {
            $log.debug(response);
            vm.postArray = response.data;
          }).catch(function (err) {
            $log.debug(err);
          });
        }

        vm.onLoad();
      }
    }
  })();