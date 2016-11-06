(function () {
    'use strict';

    angular
        .module('arepApp')
        .directive('shlistListItem', shlistListItem);

    /** @ngInject */
    function shlistListItem() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/connection/shlist/list/shlist.list.item.directive.html',
            scope: {
                stakeholder: '='
            },
            controller: ShlistListItemController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function ShlistListItemController($mdDialog, RequirementService, ConnectionService, NotificationService) {
            var vm = this;

            vm.hide = function (ev) {
                $mdDialog.hide();
                vm.backToRequirement(ev);
            };

            vm.select = function (ev) {
                var requirementId = RequirementService.getSelectedRequirement().$id;
                var connection = new ConnectionService.Connection();
                connection.stakeholderKey = vm.stakeholder.$id;
                ConnectionService.addConnection(requirementId, connection);
                NotificationService.showNotification("Stakeholder selected.");
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
