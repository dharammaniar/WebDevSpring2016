/**
 * @author dharam
 */
'use strict';
(function () {
    angular
        .module('PortManApp')
        .factory('StockService', StockService);

    function StockService($http) {

        return {
            getAllStocks: getAllStocks,
            findMatchingStocks: findMatchingStocks,
            getStockByCode: getStockByCode
        };

        function getAllStocks() {
            return $http.get('/api/project/stock');
        }

        function findMatchingStocks(searchTerm) {
            return $http.get('/api/project/stock?searchTerm=' + searchTerm);
        }

        function getStockByCode(code) {
            return $http.get('/api/project/stock?code=' + code);
        }
    }
})();