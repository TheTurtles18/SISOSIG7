(function() {
    'use strict';
  
    angular
      .module('main-app')
      .service('postService', postService);
  
    /** @ngInject */
    function postService($http, $log, config) {
        var self = this;

        self.getPosts = function() {
            return _responseDecorator('GET', config.apiUrl + 'posts', null, null);
        };

        self.getPost = function(id) {
            return _responseDecorator('GET', config.apiUrl + 'post/' + id, null, null);
        }

        self.createPost = function(data) {
            return _responseDecorator('POST', config.apiUrl + 'post/create', data, null);
        }

        function _responseDecorator(method, url, data, headers) {
            return $http({method: method, url: url, data: data, headers: headers}).then(function(response) {
                return response.data;
            }, function(err) {
                $log.debug(err);
            });
        }
    }

  })();