(function() {
  'use strict';

  angular
    .module('arepApp')
    .factory('FirebaseDataService', FirebaseDataService);

  /** @ngInject */
  function FirebaseDataService(firebaseRef) {
    var root = new Firebase(firebaseRef);

    var service = {
      root: root,
      projects: root.child("projects"),
      requirements: root.child("requirements"),
      keywords: root.child("keywords"),
      stakeholders: root.child("stakeholders"),
      reset: reset
    };

    return service;

    function reset(){
      root.remove();
    }
  }

})();
