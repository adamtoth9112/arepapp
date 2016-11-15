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
      connections: root.child("connections"),
      relations: root.child("relations"),
      conflicts: root.child("conflicts"),
      reset: reset
    };

    return service;

    function reset(){
      root.remove();
    }
  }

})();
