(function() {
  'use strict';

  angular
    .module('arepApp')
    .factory('NotificationService', NotificationService);

  /** @ngInject */
  function NotificationService($mdToast) {

    var service = {
      showNotification: showNotification
    };

    return service;

    function showNotification(message){
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .position("bottom right")
          .hideDelay(1500)
      );
    }

  }

})();
