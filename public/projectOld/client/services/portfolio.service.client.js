'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('PortfolioService', PortfolioService);

    function PortfolioService($http) {
        function createStockForUser(userId, stock) {
            return $http.post('/api/projectOld/portfolio/' + userId, stock);
        }

        function findAllStocksForUser(userId) {
            return $http.get('/api/projectOld/portfolio/' + userId);
        }

        function deleteStockById(stockId) {
            return $http.delete('/api/projectOld/portfolio/' + stockId);
        }

        function updateStockById(stockId, updatedStock) {
            return $http.put('/api/projectOld/portfolio/' + stockId, updatedStock);
        }

        return {
            createStockForUser: createStockForUser,
            findAllStocksForUser: findAllStocksForUser,
            deleteStockById: deleteStockById,
            updateStockById: updateStockById
        };
    }
}());