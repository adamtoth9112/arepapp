(function () {
    'use strict';

    angular
        .module('arepApp')
        .controller('RequirementDetailsDialogController', RequirementDetailsDialogController);

    /** @ngInject */
    function RequirementDetailsDialogController($mdDialog, RequirementService, KeywordService, ProjectService,
                                                NotificationService, ConnectionService, RelationService
    ) {
        var vm = this;
        vm.connections = ConnectionService.getConnections(vm.requirement);
        vm.newKeywords = [];
        vm.relations = RelationService.getRelations(vm.requirement);

        vm.hide = function () {
            $mdDialog.hide();
            RequirementService.setSelectedRequirement(null);
        };
        vm.cancel = function () {
            $mdDialog.cancel();
            RequirementService.setSelectedRequirement(null);
        };

        vm.save = function () {
            var projectId = ProjectService.getActualProject().$id;
            RequirementService.updateRequirement(projectId, vm.requirement);
            KeywordService.addKeywords(vm.requirement.$id, vm.requirement.parentId, vm.newKeywords);
            ConnectionService.updateConnections(vm.requirement.$id, vm.connections);
            NotificationService.showNotification("Requirement saved successfully.");
            vm.hide();
        };

        vm.addNewKeyword = function () {
            vm.newKeywords.push(new KeywordService.Keyword());
        };

        vm.addNewConnection = function (ev) {
            vm.openNewConnectionDialog(ev);
        };

        vm.changeFunctional = function () {
            vm.requirement.functional = !vm.requirement.functional;
        };

        vm.openNewConnectionDialog = function (ev) {
            $mdDialog.show({
                controller: "NewStakeholderListDialogController",
                controllerAs: "vm",
                templateUrl: 'app/components/connection/shlist/shlist.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            });
        };

        vm.showConflicts = function (ev) {

            $mdDialog.show({
                controller: "ConflictListDialogController",
                locals: {relations: vm.relations},
                controllerAs: "vm",
                bindToController: true,
                templateUrl: 'app/components/conflict/conflictlist.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            });
        };

        vm.refine = function (ev) {
            $mdDialog.show({
                controller: "NewRequirementDialogController",
                controllerAs: "vm",
                templateUrl: 'app/components/req/new/new.req.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false
            });
        };

        vm.changeSubtype = function (id) {
            vm.requirement.subtype = id;
        }
    }
})();
