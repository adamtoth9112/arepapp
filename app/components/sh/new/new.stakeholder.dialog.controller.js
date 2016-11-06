(function () {
    'use strict';

    angular
        .module('arepApp')
        .controller('NewStakeholderDialogController', NewStakeholderDialogController);

    /** @ngInject */
    function NewStakeholderDialogController($mdDialog, StakeholderService, ProjectService, NotificationService, RequirementService, ConnectionService) {
        var vm = this;
        vm.stakeholder = new StakeholderService.Stakeholder();

        vm.hide = function (stakeholder, ev) {
            $mdDialog.hide();
            vm.backToRequirement(stakeholder, ev);
        };
        vm.cancel = function (ev) {
            $mdDialog.cancel();
            vm.backToRequirement(ev);
        };

        vm.save = function (ev) {
            var projectId = ProjectService.getActualProject().$id;
            StakeholderService.addStakeholder(projectId, vm.stakeholder).then(
                function (stakeholder) {
                    NotificationService.showNotification("Stakeholder created successfully.");
                    vm.hide(stakeholder, ev);
                }
            );
        };

        vm.backToRequirement = function (stakeholder, ev) {
            var requirement = RequirementService.getSelectedRequirement();

            if (requirement == null)
                return;

            if (stakeholder != null) {
                var connection = new ConnectionService.Connection();
                connection.stakeholderKey = stakeholder.key();
                ConnectionService.addConnection(requirement.$id, connection);
            }

            $mdDialog.show({
                controller: "RequirementDetailsDialogController",
                locals: {requirement: angular.copy(requirement)},
                controllerAs: 'vm',
                bindToController: true,
                templateUrl: 'app/components/req/details/req.details.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            })
        };
    }
})();
