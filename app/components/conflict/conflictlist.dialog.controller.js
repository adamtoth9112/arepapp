(function () {
    'use strict';

    angular
        .module('arepApp')
        .controller('ConflictListDialogController', ConflictListDialogController);

    /** @ngInject */
    function ConflictListDialogController($mdDialog, RequirementService, ConflictService) {
        var vm = this;
        var requirement = RequirementService.getSelectedRequirement();

        vm.conflicts = [];

        for (var i = 0; i < vm.relations.length; i++) {
            ConflictService.getConflictsToRequirement(vm.relations[i]).$loaded().then(
                function (confs) {
                    angular.forEach(confs, function (conf) {
                        if (requirement.$id === conf.requirementId) {
                        }
                        else {
                            var old = false;
                            angular.forEach(vm.conflicts, function (added) {
                                if (added.requirementId === conf.requirementId) {
                                    old = true;
                                }
                            });
                            if (!old) {
                                vm.conflicts.push(conf);
                            }
                        }
                    });
                }
            );
        }

        vm.hide = function (ev) {
            $mdDialog.hide();
            vm.backToRequirement(ev);
        };
        vm.cancel = function (ev) {
            $mdDialog.cancel();
            vm.backToRequirement(ev);
        };


        vm.backToRequirement = function (ev) {

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
                clickOutsideToClose: false
            })
        };
    }
})();