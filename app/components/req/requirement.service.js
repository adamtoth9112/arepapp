(function() {
    'use strict';

    angular
        .module('arepApp')
        .factory('RequirementService', RequirementService);

    /** @ngInject */
    function RequirementService($firebaseArray, FirebaseDataService, ProjectService, $firebaseObject, NotificationService) {
        var requirements = null;
        var selectedRequirement = null;

        var service = {
            Requirement: Requirement,
            Initialize: init,
            getRequirements: getRequirements,
            getRequirementById: getRequirementById,
            addRequirement: addRequirement,
            removeRequirement: removeRequirement,
            updateRequirement: updateRequirement,
            getSelectedRequirement: getSelectedRequirement,
            setSelectedRequirement: setSelectedRequirement
        };

        if (ProjectService.getActualProject() != null) {
            init();
        }

        return service;

        function init(){
            var projectId = ProjectService.getActualProject().$id;
            requirements = $firebaseArray(FirebaseDataService.requirements.child(projectId));
        }

        function Requirement() {
            this.title = '';
            this.id = '';
            this.description = '';
            this.functional = true;
            this.subtype = '0'
            this.priority = 0;
        }

        function getRequirements() {
            return requirements;
        }

        function getRequirementById(projectId, id){
            return $firebaseObject(FirebaseDataService.requirements.child(projectId).child(id));
        }

        function updateRequirement(projectId, requirement) {
            FirebaseDataService.requirements.child(projectId).child(requirement.$id).set({
                title: requirement.title,
                description: requirement.description,
                functional: requirement.functional,
                id: requirement.id,
                subtype: requirement.subtype,
                priority: requirement.priority
            });
        }

        function addRequirement(projectId, requirement){
            var used = false;
            return requirements.$loaded()
                .then(function(){
                    angular.forEach(requirements, function(req) {
                            if (!used) {
                                if (req.id === requirement.id)
                                    used = true;
                            }
                    });

                    if (used) {
                        requirement.id = '';
                        NotificationService.showNotification("Identifier is already in use!");
                        return;
                    }
                    return FirebaseDataService.requirements.child(projectId).push(requirement);
                });
        }

        function removeRequirement(requirement){
            return requirements.$remove(requirement);
        }

        function setSelectedRequirement(requirement) {
            this.selectedRequirement = requirement;
        }

        function getSelectedRequirement() {
            return this.selectedRequirement;
        }
    }

})();
