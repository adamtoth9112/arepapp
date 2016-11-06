(function() {
    'use strict';

    angular
        .module('arepApp')
        .directive('connectionListItem', connectionListItem);

    /** @ngInject */
    function connectionListItem() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/connection/connection.list.item.directive.html',
            scope: {
                connection: '='
            },
            controller: ConnectionItemController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function ConnectionItemController(ConnectionService, StakeholderService, RequirementService) {
            var vm = this;
            vm.stakeholder = StakeholderService.getStakeholderById(vm.connection.stakeholderKey);
            vm.viewpoints = ['Interactor', 'Domain', 'Indirect'];

            vm.removeConnection = function() {
               var req = RequirementService.getSelectedRequirement();
               ConnectionService.removeConnection(req.$id, vm.connection);
            };

            vm.changeViewpoint = function () {
                if (vm.connection.viewpoint == 2) {
                    vm.connection.viewpoint = 0;
                }
                else {
                    vm.connection.viewpoint += 1;
                }
            };
        }
    }

})();
