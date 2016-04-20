/**
 * @author dharam
 */
'use strict';

(function () {
    angular
        .module('PortManApp')
        .controller('SearchResultController', SearchResultController);

    function SearchResultController($rootScope, StockService) {
        var vm = this;

        function init() {
            vm.searchTerm = $rootScope.searchTerm;
            StockService.findMatchingStocks(vm.searchTerm)
                .then(function (searchResult) {
                    var stocksResult = [];

                    _.forEach(searchResult.data, function (stock) {
                        stocksResult.push({
                            name: stock.code + ' : ' + stock.company,
                            url: '#/stock/' + stock.code
                        });
                    });

                    vm.stocks = stocksResult;
                });
        }

        init();
    }
}());