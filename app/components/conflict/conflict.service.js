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
        }

        function updateConflicts(keywordId, conflicts) {
            angular.forEach(conflicts, function (conflict) {
                FirebaseDataService.conflicts.child(keywordId).child(conflict.$id).set({
                    requirementId: conflicts.requirementId
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
            /*angular.forEach(relations, function (relation) {
                cpart = getConflicts(relation.keywordId);

                angular.forEach(cpart, function (cp) {
                    if (conflicts.indexOf(cp) === -1) {
                        conflicts.push(cp);
                    }
                });

            });*/
            return conflicts;
        }
    }
})();
