(function () {
    'use strict';

    angular
        .module('arepApp')
        .controller('StakeholdersController', StakeholdersController);

    /** @ngInject */
    function StakeholdersController(StakeholderService, ProjectService, $mdDialog, $state) {
        var vm = this;

        vm.project = ProjectService.getActualProject();

        if (vm.project == null) {
            $state.go('home');
        }

        vm.stakeholders = StakeholderService.getStakeholders();

        vm.openNewStakeholderDialog = function (ev) {
            $mdDialog.show({
                controller: "NewStakeholderDialogController",
                controllerAs: "vm",
                templateUrl: 'app/components/sh/new/new.stakeholder.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            });
        };
    }
})();