(function() {
  'use strict';

  angular
    .module('arepApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/project/projects.html',
        controller: 'ProjectsController',
        controllerAs: 'vm'
      });

      $stateProvider
          .state('requirements', {
              url: '/requirements',
              templateUrl: 'app/components/req/requirements.html',
              controller: 'RequirementsController',
              controllerAs: 'vm'
          });

      $stateProvider
          .state('stakeholders', {
              url: '/stakeholders',
              templateUrl: 'app/components/sh/stakeholders.html',
              controller: 'StakeholdersController',
              controllerAs: 'vm'
          });

    $urlRouterProvider.otherwise('/');
  }

})();
