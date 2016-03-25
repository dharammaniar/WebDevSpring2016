'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('PortfolioService', PortfolioService);

    function PortfolioService($http) {
        function createStockForUser(userId, stock) {
            return $http.post('/api/project/portfolio/' + userId, stock);
        }

        function findAllStocksForUser(userId) {
            return $http.get('/api/project/portfolio/' + userId);
        }

        function deleteStockById(stockId) {
            return $http.delete('/api/project/portfolio/' + stockId);
        }

        function updateStockById(stockId, updatedStock) {
            return $http.put('/api/project/portfolio/' + stockId, updatedStock);
        }

        return {
            createStockForUser: createStockForUser,
            findAllStocksForUser: findAllStocksForUser,
            deleteStockById: deleteStockById,
            updateStockById: updateStockById
        };
    }
}());