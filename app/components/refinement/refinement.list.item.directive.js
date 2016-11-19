(function() {
    'use strict';

    angular
        .module('arepApp')
        .directive('refinementListItem', refinementListItem);

    /** @ngInject */
    function refinementListItem() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/refinement/refinement.list.item.directive.html',
            scope: {
                refinement: '='
            },
            controller: RefinementListItemController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function RefinementListItemController(ProjectService, RequirementService, RefinementService, $mdDialog) {
            var vm = this;

            vm.requirement = RequirementService.getRequirementById(ProjectService.getActualProject().$id, vm.refinement.requirementKey);

            vm.removeRequirement = function() {
                RequirementService.removeRequirement(vm.requirement);
                RefinementService.removeRefinement(vm.requirement.$id, vm.refinement);
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
        }
    }

})();
