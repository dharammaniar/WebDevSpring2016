/**
 * @author dharam
 */
'use strict';

(function() {
    angular
        .module('PortManApp')
        .factory('StockService', StockService);

    function StockService($http) {

        function getAllStocks() {
            return $http.get('/api/project/stock');
        }

        function findMatchingStocks(searchTerm) {
            return $http.get('/api/project/stock?searchTerm=' + searchTerm);
        }

        function getStockByCode(code) {
            return $http.get('/api/project/stock?code=' + code);
        }

        return {
            getAllStocks: getAllStocks,
            findMatchingStocks: findMatchingStocks,
            getStockByCode: getStockByCode
        };
    }
})();