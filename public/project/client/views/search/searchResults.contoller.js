'use strict';

(function () {
    angular
        .module('PortManApp')
        .controller('SearchResultController', SearchResultController);

    function SearchResultController($rootScope, StockService) {
        var vm = this;

        init();

        function init() {
            vm.searchTerm = $rootScope.searchTerm;
            StockService.findMatchingStocks(vm.searchTerm)
                .then(function(searchResult) {
                    var stocksResult = [];

                    _.forEach(searchResult.data, function(search) {
                        stocksResult.push({
                            name: search,
                            url: '#/stock/' + search.split(':')[0].trim()
                        });
                    });

                    vm.stocks = stocksResult;
                });
        }
    }
}());