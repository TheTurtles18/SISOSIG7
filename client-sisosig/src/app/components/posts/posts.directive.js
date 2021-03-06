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
        templateUrl: 'views/timeline/index.pug',
        controller: PostController,
        controllerAs: 'posts'
      };
  
      return directive;
  
      /** @ngInject */
      function PostController($log, postService) {
        var vm = this;
        vm.posts = [];
  
        postService.getPosts().then(function(data) {
          $log.debug(data);
          vm.posts = data;
        }).catch(function (err) {
          $log.debug(err);
        });
      }
    }
  })();