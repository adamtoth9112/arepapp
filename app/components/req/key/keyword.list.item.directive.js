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
                keyword: '='
            },
            controller: KeywordItemController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function KeywordItemController(KeywordService, RequirementService) {
            var vm = this;

            vm.removeKeyword = function(ev) {
               var req = RequirementService.getSelectedRequirement();
               KeywordService.removeKeyword(req.$id, vm.keyword);
            };
        }
    }

})();
