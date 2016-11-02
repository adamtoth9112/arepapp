(function () {
    'use strict';

    angular
        .module('arepApp')
        .controller('ProjectsController', ProjectsController);

    /** @ngInject */
    function ProjectsController(ProjectService, $mdDialog) {
        var vm = this;

        vm.projects = ProjectService.getProjects();

        vm.openNewProjectDialog = function (ev) {
            $mdDialog.show({
                controller: "NewProjectDialogController",
                controllerAs: "vm",
                templateUrl: 'app/components/project/new/new.project.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            });
        };
    }
})();