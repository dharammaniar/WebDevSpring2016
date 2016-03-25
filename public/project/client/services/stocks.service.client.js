'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('StockService', StockService);

    function StockService($http) {

        function getAllStocks() {
            return $http.get('/api/project/stock');
        }

        function findMatchingStocks(searchTerm) {
            return $http.get('/api/project/stock?searchTerm=' + searchTerm);
        }

        return {
            getAllStocks: getAllStocks,
            findMatchingStocks: findMatchingStocks
        };
    }
})();