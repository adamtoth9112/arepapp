(function () {
    'use strict';

    angular
        .module('arepApp')
        .factory('KeywordService', KeywordService);

    /** @ngInject */
    function KeywordService($firebaseArray, $firebaseObject, FirebaseDataService, RelationService, ProjectService, ConflictService) {
        var keywords = null;
        var projectId;

        var service = {
            Keyword: Keyword,
            addKeywords: addKeywords,
            getKeywordById: getKeywordById,
            removeKeyword: removeKeyword
        };

        init();

        return service;

        function Keyword() {
            this.value = '';
        }

        function init() {
            projectId = ProjectService.getActualProject().$id;
            keywords = $firebaseArray(FirebaseDataService.keywords.child(projectId));
        }

        function addKeywords(requirementId, parentId, newKeywords) {
            angular.forEach(newKeywords, function (keyword) {

                var keywordId = null;

                angular.forEach(keywords, function (oldKeyword) {
                    if (oldKeyword.value == keyword.value) {
                        keywordId = oldKeyword.$id;
                    }
                });

                if (keywordId == null) {
                    keywords.$add(keyword).then(
                        function (keyword) {
                            addRelation(requirementId, parentId, keyword.key());
                        }
                    );
                }
                else {
                    addRelation(requirementId, parentId, keywordId);
                }
            });
        }

        function addRelation(requirementId, parentId, keywordId) {
            var relation = new RelationService.Relation();
            relation.keywordId = keywordId;
            RelationService.addRelation(requirementId, relation).then(
                function (relation) {
                    addConflict(keywordId, parentId, requirementId);
                }
            );
        }

        function addConflict(keywordId, parentId, requirementId) {
            var conflict = new ConflictService.Conflict();
            conflict.requirementId = requirementId;
            conflict.parentId = parentId;
            ConflictService.addConflict(keywordId, conflict);
        }

        function removeKeyword(keyword) {
            return keywords.$remove(keyword);
        }

        function getKeywordById(id) {
            return $firebaseObject(FirebaseDataService.keywords.child(projectId).child(id));
        }
    }
})();
