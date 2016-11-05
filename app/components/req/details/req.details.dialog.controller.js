(function() {
  'use strict';

  angular
    .module('arepApp')
    .controller('RequirementDetailsDialogController', RequirementDetailsDialogController);

    /** @ngInject */
    function RequirementDetailsDialogController($mdDialog, RequirementService, KeywordService, ProjectService, NotificationService) {
      var vm = this;
      vm.keywords = KeywordService.getKeywordsToRequirement(vm.requirement);
      vm.newKeywords = [];

      vm.hide = function () {
        $mdDialog.hide();
      };
      vm.cancel = function () {
        $mdDialog.cancel();
      };

      vm.save = function () {
       var projectId = ProjectService.getActualProject().$id;
       RequirementService.updateRequirement(projectId, vm.requirement);
        KeywordService.addKeywordsToRequirement(vm.requirement.$id, vm.keywords, vm.newKeywords);
        NotificationService.showNotification("Requirement saved successfully.");
        vm.hide();
      };

      vm.addNewKeyword = function () {
        vm.newKeywords.push(new KeywordService.Keyword());
      };

      vm.removeKeyword = function (keyword) {

      }
    }
})();
