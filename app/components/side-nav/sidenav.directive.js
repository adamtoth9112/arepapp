(function() {
  'use strict';

  angular
    .module('arepApp')
    .directive('sideNav', sideNav);

  /** @ngInject */
  function sideNav() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/side-nav/sidenav.html',
      scope: {

      },
      controller: SideNavController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SideNavController($mdSidenav, $mdDialog, FirebaseDataService, ProjectService) {
      var vm = this;

      vm.close = function () {
        $mdSidenav('right').close();
      };

      vm.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
          .title('Are you sure you want to reset the database?')
          .textContent('All data will be deleted permanently.')
          .targetEvent(ev)
          .ok('Yes, delete everything')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
          FirebaseDataService.reset();
        }).finally(vm.close);
      };

      vm.visible = function(ev) {
        return ProjectService.getActualProject() != null;
      };
    }
  }

})();
