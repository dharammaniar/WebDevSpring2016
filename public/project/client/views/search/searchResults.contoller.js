'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('SearchResultController', SearchResultController);

    function SearchResultController($scope, $rootScope, StockService) {

        init();

        function init() {
            var searchTerm = $rootScope.searchTerm;
            var searchResult = StockService.findMatchingStocks(searchTerm);

            var stocksResult = [];

            _.forEach(searchResult, function(search) {
                stocksResult.push({
                    name: search,
                    url: '#/stock/' + search.split(':')[0].trim()
                });
            });

            $scope.stocks = stocksResult;
        }
    }
}());