(function() {
  'use strict';

  angular
    .module('arepApp')
    .controller('NewRequirementDialogController', NewRequirementDialogController);

  /** @ngInject */
  function NewRequirementDialogController($mdDialog, RequirementService, KeywordService, ProjectService, NotificationService) {
    var vm = this;
    vm.requirement = new RequirementService.Requirement();
    vm.keywords = [];

    vm.hide = function() {
      $mdDialog.hide();
    };
    vm.cancel = function() {
      $mdDialog.cancel();
    };

    vm.save = function () {
      var projectId = ProjectService.getActualProject().$id;
      RequirementService.addRequirement(projectId, vm.requirement).then(
          function (requirement) {
            var requirementId = requirement.key();
            KeywordService.addKeywordsToRequirement(requirementId, vm.keywords);
            NotificationService.showNotification("Requirement created successfully.");
            vm.hide();
          }
      );
    }
    ;

    vm.addNewKeyword = function () {
      vm.keywords.push(new KeywordService.Keyword());
    };
  }
})();
