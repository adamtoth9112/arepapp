(function () {
    'use strict';

    angular
        .module('arepApp')
        .controller('RequirementsController', RequirementsController);

    /** @ngInject */
    function RequirementsController(RequirementService, ProjectService, $mdDialog, $state) {
        var vm = this;

        vm.project = ProjectService.getActualProject();
        vm.requirements = RequirementService.getRequirements();

        if (vm.project == null) {
            $state.go('home');
        }

        vm.openNewRequirementDialog = function (ev) {
            $mdDialog.show({
                controller: "NewRequirementDialogController",
                controllerAs: "vm",
                templateUrl: 'app/components/req/new/new.req.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            });
        };
    }
})();