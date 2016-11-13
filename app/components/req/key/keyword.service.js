(function() {
  'use strict';

  angular
    .module('arepApp')
    .factory('KeywordService', KeywordService);

  /** @ngInject */
  function KeywordService($firebaseArray, FirebaseDataService) {
    var keywords = null;

    var service = {
      Keyword: Keyword,
      addKeywordsToRequirement: addKeywordsToRequirement,
      getKeywordsToRequirement: getKeywordsToRequirement,
      removeKeyword: removeKeyword
    };

    init();

    return service;

    function Keyword(){
      this.value = '';
    }

    function init(){
      keywords = $firebaseArray(FirebaseDataService.keywords);
    }

    function addKeywordsToRequirement(requirementId, newKeywords){
      angular.forEach(newKeywords, function (keyword) {
          FirebaseDataService.keywords.child(requirementId).push(keyword);
      });
    }

    function removeKeyword(requirementId, keyword) {
      FirebaseDataService.keywords.child(requirementId).child(keyword.$id).remove();
    }

    function getKeywordsToRequirement(requirement){
      return $firebaseArray(FirebaseDataService.keywords.child(requirement.$id));
    }
  }
})();
