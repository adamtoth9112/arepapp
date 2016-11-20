(function () {
    'use strict';

    angular
        .module('arepApp')
        .controller('NewRequirementDialogController', NewRequirementDialogController);

    /** @ngInject */
    function NewRequirementDialogController($mdDialog, RequirementService, KeywordService, ProjectService,
                                            NotificationService, RefinementService) {
        var vm = this;
        vm.parentRequirement = RequirementService.getSelectedRequirement();
        vm.requirement = new RequirementService.Requirement();
        vm.project = ProjectService.getActualProject();
        vm.parentId = vm.parentRequirement == null ? vm.project.id : (vm.parentRequirement.id);
        vm.keywords = [];

        vm.hide = function (ev) {
            $mdDialog.hide();
            vm.backToRequirement(ev);
        };
        vm.cancel = function (ev) {
            $mdDialog.cancel();
            vm.backToRequirement(ev);
        };

        vm.save = function () {
            vm.requirement.parentId = vm.parentRequirement == null ? '' : vm.parentRequirement.$id;
            vm.requirement.id = vm.parentId + '-' + vm.requirement.id;
            RequirementService.addRequirement(vm.project.$id, vm.requirement).then(
                function (requirement) {
                    var requirementId = requirement.key();
                    KeywordService.addKeywords(requirementId, vm.requirement.parentId, vm.keywords);
                    if (vm.parentRequirement != null) {
                        var ref = new RefinementService.Refinement();
                        ref.requirementKey = requirementId;
                        RefinementService.addRefinement(vm.parentRequirement.$id, ref);
                    }
                    NotificationService.showNotification("Requirement created successfully.");
                    vm.hide();
                }
            );
        }
        ;

        vm.addNewKeyword = function () {
            vm.keywords.push(new KeywordService.Keyword());
        };

        vm.changeFunctional = function () {
            vm.requirement.functional = !vm.requirement.functional;
        };

        vm.changeSubtype = function (id) {
            vm.requirement.subtype = id;
        };

        vm.backToRequirement = function (ev) {

            if (vm.parentRequirement == null)
                return;

            $mdDialog.show({
                controller: "RequirementDetailsDialogController",
                locals: {requirement: angular.copy(vm.parentRequirement)},
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
