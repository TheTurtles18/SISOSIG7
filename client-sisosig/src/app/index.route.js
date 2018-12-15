(function() {
    'use strict';
  
    angular
      .module('main-app')
      .config(routerConfig);
  
    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/controllers/main/main.html',
          controller: 'MainController',
          controllerAs: 'main'
        })
        .state('post',{
          url: '/post/:id',
          templateUrl: 'app/controllers/post/post.html',
          controller: 'PostController',
          controllerAs: 'post'
        });
  
      $urlRouterProvider.otherwise('/');
  
      $locationProvider.html5Mode(true);
    }
  
  })();