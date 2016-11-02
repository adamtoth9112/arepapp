(function() {
  'use strict';

  angular
    .module('arepApp')
    .directive('stakeholderListItem', stakeholderListItem);

  /** @ngInject */
  function stakeholderListItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/sh/list/stakeholder.list.item.directive.html',
      scope: {
        stakeholder: '='
      },
      controller: StakeholderListItemController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function StakeholderListItemController($mdDialog, StakeholderService) {
      var vm = this;

      vm.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete this stakeholder?')
          .textContent('It will be removed permanently.')
          .targetEvent(ev)
          .ok('Yes, delete it')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
          StakeholderService.removeStakeholder(vm.stakeholder);
        });
      };

      vm.showDetails = function (ev) {
        $mdDialog.show({
          controller: "StakeholderDetailsDialogController",
          locals: {stakeholder: angular.copy(vm.stakeholder)},
          controllerAs: 'vm',
          bindToController: true,
          templateUrl: 'app/components/sh/details/stakeholder.details.dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
      };
    }
  }

})();
