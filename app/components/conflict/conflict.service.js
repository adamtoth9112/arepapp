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
            removeConflict: removeConflict
        };

        return service;

        function Conflict() {
            this.requirementId = '';
        }

        function updateConflicts(keywordId, conflicts) {
            _.forEach(conflicts, function (conflict) {
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

        function getConflicts(conflict) {
            return $firebaseArray(FirebaseDataService.conflicts.child(conflict.$id));
        }
    }
})();
