(function() {
  'use strict';

  angular
    .module('arepApp')
    .controller('NewStakeholderDialogController', NewStakeholderDialogController);

  /** @ngInject */
  function NewStakeholderDialogController($mdDialog, StakeholderService, ProjectService, NotificationService) {
    var vm = this;
    vm.stakeholder = new StakeholderService.Stakeholder();

    vm.hide = function() {
      $mdDialog.hide();
    };
    vm.cancel = function() {
      $mdDialog.cancel();
    };

    vm.save = function () {
      var projectId = ProjectService.getActualProject().$id;
      StakeholderService.addStakeholder(projectId, vm.stakeholder).then(
          function (stakeholder) {
            NotificationService.showNotification("Stakeholder created successfully.");
            vm.hide();
          }
      );
    };
  }
})();
