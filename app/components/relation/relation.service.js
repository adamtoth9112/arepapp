(function () {
    'use strict';

    angular
        .module('arepApp')
        .factory('RelationService', RelationService);

    /** @ngInject */
    function RelationService($firebaseArray, FirebaseDataService) {

        var service = {
            Relation: Relation,
            updateRelations: updateRelations,
            addRelation: addRelation,
            getRelations: getRelations,
            removeRelation: removeRelation
        };

        return service;

        function Relation() {
            this.keywordId = '';
        }

        function updateRelations(requirementId, relations) {
            _.forEach(relations, function (relation) {
                FirebaseDataService.relations.child(requirementId).child(relation.$id).set({
                    keywordId: relation.keywordId
                });
            })
        }

        function addRelation(requirementId, relation) {
            return FirebaseDataService.relations.child(requirementId).push(relation);
        }

        function removeRelation(requirementId, relation) {
            FirebaseDataService.relations.child(requirementId).child(relation.$id).remove();
        }

        function getRelations(requirement) {
            return $firebaseArray(FirebaseDataService.relations.child(requirement.$id));
        }
    }
})();
