'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('SearchResultController', SearchResultController);

    function SearchResultController($scope, $rootScope, StockService) {

        init();

        function init() {
            var searchTerm = $rootScope.searchTerm;
            StockService.findMatchingStocks(searchTerm)
                .then(function(searchResult) {
                    var stocksResult = [];

                    _.forEach(searchResult.data, function(search) {
                        stocksResult.push({
                            name: search,
                            url: '#/stock/' + search.split(':')[0].trim()
                        });
                    });

                    $scope.stocks = stocksResult;
                });
        }
    }
}());