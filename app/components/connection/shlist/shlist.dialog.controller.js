(function () {
    'use strict';

    angular
        .module('arepApp')
        .controller('NewStakeholderListDialogController', NewStakeholderListDialogController);

    /** @ngInject */
    function NewStakeholderListDialogController(StakeholderService, ProjectService, RequirementService, $mdDialog) {
        var vm = this;

        vm.project = ProjectService.getActualProject();
        vm.stakeholders = StakeholderService.getStakeholders();

        vm.hide = function (ev) {
            $mdDialog.hide();
            vm.backToRequirement(ev);
        };
        vm.cancel = function (ev) {
            $mdDialog.cancel();
            vm.backToRequirement(ev);
        };

        vm.openNewStakeholderDialog = function (ev) {
            $mdDialog.show({
                controller: "NewStakeholderDialogController",
                controllerAs: "vm",
                templateUrl: 'app/components/sh/new/new.stakeholder.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false
            });
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
})();