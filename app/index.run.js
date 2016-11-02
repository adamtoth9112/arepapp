(function() {
  'use strict';

  angular
    .module('arepApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();
