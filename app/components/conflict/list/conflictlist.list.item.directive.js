(function () {
    'use strict';

    angular
        .module('arepApp')
        .directive('conflictlistListItem', conflictlistListItem);

    /** @ngInject */
    function conflictlistListItem() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/conflict/list/conflictlist.list.item.directive.html',
            scope: {
                conflict: '='
            },
            controller: ConflictlistListItemController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function ConflictlistListItemController($mdDialog, ProjectService, RequirementService) {
            var vm = this;

            vm.requirement = RequirementService.getRequirementById(ProjectService.getActualProject().$id, vm.conflict.requirementId);
            vm.selectedRequirement = RequirementService.getSelectedRequirement();

            vm.hide = function (ev) {
                $mdDialog.hide();
                vm.backToRequirement(ev);
            };

            vm.select = function (ev) {

                vm.hide(ev);
            };

            vm.backToRequirement = function (ev) {
                var requirement = RequirementService.getSelectedRequirement();

                if (requirement == null)
                    return;

                $mdDialog.show({
                    controller: "RequirementDetailsDialogController",
                    locals: {requirement: angular.copy(requirement)},
                    controllerAs: 'vm',
                    bindToController: true,
                    templateUrl: 'app/components/req/details/req.details.dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:false
                })
            };
        }
    }

})();
