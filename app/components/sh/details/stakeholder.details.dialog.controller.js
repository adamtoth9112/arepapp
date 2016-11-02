(function() {
  'use strict';

  angular
    .module('arepApp')
    .controller('StakeholderDetailsDialogController', StakeholderDetailsDialogController);

    /** @ngInject */
    function StakeholderDetailsDialogController($mdDialog, StakeholderService, ProjectService, NotificationService) {
      var vm = this;

      vm.hide = function () {
        $mdDialog.hide();
      };
      vm.cancel = function () {
        $mdDialog.cancel();
      };

      vm.save = function () {
       var projectId = ProjectService.getActualProject().$id;
       StakeholderService.updateStakeholder(projectId, vm.stakeholder);
        NotificationService.showNotification("Stakeholder saved successfully.");
        vm.hide();
      };
    }
})();
