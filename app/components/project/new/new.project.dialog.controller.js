(function() {
  'use strict';

  angular
    .module('arepApp')
    .controller('NewProjectDialogController', NewProjectDialogController);

  /** @ngInject */
  function NewProjectDialogController($mdDialog, ProjectService, NotificationService) {
    var vm = this;
    vm.project = new ProjectService.Project();

    activate();

    vm.hide = function() {
      $mdDialog.hide();
    };
    vm.cancel = function() {
      $mdDialog.cancel();
    };

    vm.save = function () {
      ProjectService.addProject(vm.project).then(
          function (project) {
            ProjectService.setActualProject(project);
            NotificationService.showNotification("Project created successfully.");
            vm.hide();
          }
      );
    }
    ;

    function activate(){

    }
  }
})();
