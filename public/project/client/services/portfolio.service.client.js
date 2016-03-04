'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('PortfolioService', PortfolioService);

    function PortfolioService() {
        var allStocks = [
            {
                "_id": "1",
                "userId": 123,
                "stock": "AAPL",
                "price": "105.23",
                "quantity": 30,
                "date": "2016-03-04T05:00:00.000Z"
            },
            {
                "_id": "2",
                "userId": 123,
                "stock": "GOGGL",
                "price": "675.48",
                "quantity": 10,
                "date": "2016-02-29T05:00:00.000Z"
            },
            {
                "_id": "3",
                "userId": 123,
                "stock": "YAHOO",
                "price": "42.82",
                "quantity": 200,
                "date": "2016-01-14T05:00:00.000Z"
            }
        ];

        function createStockForUser(userId, stock, callback) {
            _.extend(stock, {
                _id: (new Date).getTime(),
                userId: userId
            });
            allStocks[allStocks.length] = stock;

            callback(stock);
        }

        function findAllStocksForUser(userId, callback) {
            var allStocksFound = _.filter(allStocks, {
                userId: userId
            });

            callback(allStocksFound);
        }

        function deleteStockById(stockId, callback) {
            _.remove(allStocks, function(stock) {
                return stock._id === stockId;
            });

            callback(allStocks);
        }

        function updateStockById(stockId, updatedStock, callback) {
            var stockToUpdate = _.find(allStocks, {
                _id: stockId
            });

            _.extend(stockToUpdate, updatedStock);

            callback(stockToUpdate);
        }

        return {
            createStockForUser: createStockForUser,
            findAllStocksForUser: findAllStocksForUser,
            deleteStockById: deleteStockById,
            updateStockById: updateStockById
        };
    }
}());