(function() {
  'use strict';

  angular
    .module('arepApp')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $mdThemingProvider) {
    $logProvider.debugEnabled(true);

    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $mdThemingProvider.theme('default')
        .primaryPalette('cyan')
        .accentPalette('deep-orange');
  }

})();
