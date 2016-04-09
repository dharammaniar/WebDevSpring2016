'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('StockService', StockService);

    function StockService($http) {

        function getAllStocks() {
            return $http.get('/api/projectOld/stock');
        }

        function findMatchingStocks(searchTerm) {
            return $http.get('/api/projectOld/stock?searchTerm=' + searchTerm);
        }

        return {
            getAllStocks: getAllStocks,
            findMatchingStocks: findMatchingStocks
        };
    }
})();