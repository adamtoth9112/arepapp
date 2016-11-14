(function () {
    'use strict';

    angular
        .module('arepApp')
        .factory('KeywordService', KeywordService);

    /** @ngInject */
    function KeywordService($firebaseArray, $firebaseObject, FirebaseDataService, RelationService, ProjectService) {
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

        function addKeywords(requirementId, newKeywords) {
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
                            addRelation(requirementId, keyword.key())
                        }
                    );
                }
                else {
                    addRelation(requirementId, keywordId);
                }
            });
        }

        function addRelation(requirementId, keywordId) {
            var relation = new RelationService.Relation();
            relation.key = keywordId;
            RelationService.addRelation(requirementId, relation);
        }

        function removeKeyword(keyword) {
            return keywords.$remove(keyword);
        }

        function getKeywordById(id) {
            return $firebaseObject(FirebaseDataService.keywords.child(projectId).child(id));
        }
    }
})();
