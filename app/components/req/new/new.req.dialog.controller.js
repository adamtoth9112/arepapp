(function () {
    'use strict';

    angular
        .module('arepApp')
        .controller('NewRequirementDialogController', NewRequirementDialogController);

    /** @ngInject */
    function NewRequirementDialogController($mdDialog, RequirementService, KeywordService, ProjectService, NotificationService) {
        var vm = this;
        vm.requirement = new RequirementService.Requirement();
        vm.project = ProjectService.getActualProject();
        vm.keywords = [];
        vm.connections = [];

        vm.hide = function () {
            $mdDialog.hide();
        };
        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.save = function () {
            vm.requirement.id = vm.project.id + '-' + vm.requirement.id;
            RequirementService.addRequirement(vm.project.$id, vm.requirement).then(
                function (requirement) {
                    var requirementId = requirement.key();
                    KeywordService.addKeywordsToRequirement(requirementId, [], vm.keywords);
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
    }
})();
