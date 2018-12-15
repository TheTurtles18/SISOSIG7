(function() {
    'use strict';
  
    angular
      .module('main-app')
      .run(runBlock);
  
    /** @ngInject */
    function runBlock($log) {
  
      $log.debug('runBlock end');
    }
  
  })();