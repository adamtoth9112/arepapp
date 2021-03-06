(function() {
  'use strict';

  angular
    .module('arepApp')
    .directive('requirementListItem', requirementListItem);

  /** @ngInject */
  function requirementListItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/req/list/requirement.list.item.directive.html',
      scope: {
        requirement: '='
      },
      controller: RequirementListItemController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function RequirementListItemController($mdDialog, KeywordService, RequirementService) {
      var vm = this;
      vm.keywords = null;

      activate();

      vm.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this requirement?')
          .textContent('It will be removed permanently.')
          .targetEvent(ev)
          .ok('Yes, delete it')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
          RequirementService.removeRequirement(vm.requirement);
        });
      };

      vm.showDetails = function (ev) {
        RequirementService.setSelectedRequirement(vm.requirement);
        $mdDialog.show({
          controller: "RequirementDetailsDialogController",
          locals: {requirement: angular.copy(vm.requirement)},
          controllerAs: 'vm',
          bindToController: true,
          templateUrl: 'app/components/req/details/req.details.dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false
        })
      };

      function activate(){
        vm.keywords = KeywordService.getKeywordsToRequirement(vm.requirement);
      }
    }
  }

})();
