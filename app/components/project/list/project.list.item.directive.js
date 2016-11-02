(function() {
  'use strict';

  angular
    .module('arepApp')
    .directive('projectListItem', projectListItem);

  /** @ngInject */
  function projectListItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/project/list/project.list.item.directive.html',
      scope: {
        project: '='
      },
      controller: ProjectListItemController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProjectListItemController($mdDialog, $location, ProjectService, RequirementService, StakeholderService, NotificationService) {
      var vm = this;

      vm.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this project?')
          .textContent('It will be removed permanently.')
          .targetEvent(ev)
          .ok('Yes, delete it')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
          ProjectService.removeProject(vm.project);
        });
      };

      vm.setActualProject = function (ev) {
        ProjectService.setActualProject(vm.project);
        RequirementService.Initialize();
        StakeholderService.Initialize();
        NotificationService.showNotification("Project '" + vm.project.title + "' selected.");
        $location.path("/requirements");
      };
    }
  }

})();
