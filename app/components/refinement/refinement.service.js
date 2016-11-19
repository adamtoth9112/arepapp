(function () {
    'use strict';

    angular
        .module('arepApp')
        .factory('RefinementService', RefinementService);

    /** @ngInject */
    function RefinementService($firebaseArray, FirebaseDataService) {

        var service = {
            Refinement: Refinement,
            updateRefinements: updateRefinements,
            addRefinement: addRefinement,
            getRefinements: getRefinements,
            removeRefinement: removeRefinement,
            removeRefinements: removeRefinements
        };

        return service;

        function Refinement() {
            this.requirementKey = '';
        }

        function updateRefinements(parentId, refinement) {
           /* _.forEach(connections, function (connection) {
                FirebaseDataService.connections.child(requirementId).child(connection.$id).set({
                    stakeholderKey: connection.stakeholderKey,
                    viewpoint: connection.viewpoint
                });
            })*/
        }

        function addRefinement(parentId, refinement) {
            return FirebaseDataService.refinements.child(parentId).push(refinement);
        }

        function removeRefinement(parentId, refinement) {
            FirebaseDataService.refinements.child(parentId).child(refinement.$id).remove();
        }

        function removeRefinements(parentId) {
            FirebaseDataService.refinements.child(parentId).remove();
        }

        function getRefinements(requirement) {
            return $firebaseArray(FirebaseDataService.refinements.child(requirement.$id));
        }
    }
})();
