(function() {
    'use strict';

    angular
        .module('arepApp')
        .directive('keywordListItem', keywordListItem);

    /** @ngInject */
    function keywordListItem() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/req/key/keyword.list.item.directive.html',
            scope: {
                relation: '='
            },
            controller: KeywordItemController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function KeywordItemController(KeywordService, RequirementService, RelationService) {
            var vm = this;
            vm.keyword = KeywordService.getKeywordById(vm.relation.key);

            vm.removeKeyword = function(ev) {
               var req = RequirementService.getSelectedRequirement();
               RelationService.removeRelation(req.$id, vm.relation);
            };
        }
    }

})();
