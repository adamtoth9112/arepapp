(function() {
    'use strict';

    angular
        .module('arepApp')
        .factory('StakeholderService', StakeholderService);

    /** @ngInject */
    function StakeholderService($firebaseArray, FirebaseDataService, ProjectService, $firebaseObject) {
        var stakeholders = null;

        var service = {
            Stakeholder: Stakeholder,
            Initialize: init,
            getStakeholders: getStakeholders,
            getStakeholderById: getStakeholderById,
            addStakeholder: addStakeholder,
            removeStakeholder: removeStakeholder,
            updateStakeholder: updateStakeholder
        };

        if (ProjectService.getActualProject() != null) {
            init();
        }

        return service;

        function init(){
            var projectId = ProjectService.getActualProject().$id;
            stakeholders = $firebaseArray(FirebaseDataService.stakeholders.child(projectId));
        }

        function Stakeholder() {
            this.title = '';
            this.description = '';
        }

        function getStakeholders() {
            return stakeholders;
        }

        function getStakeholderById(projectId, id){
            return $firebaseObject(FirebaseDataService.stakeholders.child(projectId).child(id));
        }

        function updateStakeholder(projectId, stakeholder) {
            FirebaseDataService.stakeholders.child(projectId).child(stakeholder.$id).set({
                title: stakeholder.title,
                description: stakeholder.description
            });
            return;
        }

        function addStakeholder(projectId, stakeholder){
            return FirebaseDataService.stakeholders.child(projectId).push(stakeholder);
        }

        function removeStakeholder(stakeholder){
            return stakeholders.$remove(stakeholder);
        }
    }

})();
