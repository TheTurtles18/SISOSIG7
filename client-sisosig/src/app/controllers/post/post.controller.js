(function() {
    'use strict';
  
    angular
      .module('main-app')
      .controller('PostController', PostController);
  
    /** @ngInject */
    function PostController(postService, $log) {
      var vm = this;
      vm.success = false;
      vm.error = false;
  
      vm.newPost = {
        //image
        caption: ''
      };
  
      vm.createPost = function () {
        postService.createPost(vm.newPost).then(function (response) {
          if(response) {
            vm.success = true;
          } else {
            vm.error = true;
          }
        }).catch(function (err) {
          $log.debug(err);
        });
      };
    }
  })();