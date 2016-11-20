(function () {
    'use strict';

    angular
        .module('arepApp')
        .factory('ConflictService', ConflictService);

    /** @ngInject */
    function ConflictService($firebaseArray, FirebaseDataService) {

        var service = {
            Conflict: Conflict,
            updateConflicts: updateConflicts,
            addConflict: addConflict,
            getConflicts: getConflicts,
            removeConflict: removeConflict,
            getConflictsToRequirement: getConflictsToRequirement
        };

        return service;

        function Conflict() {
            this.requirementId = '';
            this.parentId = false;
        }

        function updateConflicts(keywordId, conflicts) {
            angular.forEach(conflicts, function (conflict) {
                FirebaseDataService.conflicts.child(keywordId).child(conflict.$id).set({
                    requirementId: conflict.requirementId,
                    parentId: conflicts.parentId
                });
            })
        }

        function addConflict(keywordId, conflict) {
            return FirebaseDataService.conflicts.child(keywordId).push(conflict);
        }

        function removeConflict(keywordId, conflict) {
            FirebaseDataService.conflicts.child(keywordId).child(conflict.$id).remove();
        }

        function getConflicts(keywordId) {
            return $firebaseArray(FirebaseDataService.conflicts.child(keywordId));
        }

        function getConflictsToRequirement(relation) {
            var conflicts = getConflicts(relation.keywordId);
            return conflicts;
        }
    }
})();
