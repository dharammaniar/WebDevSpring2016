/**
 * Created by dharam on 3/25/2016.
 */
'use strict';

module.exports = function(_) {

    var allStocks = require('./portfolio.mock.json');

    function createStockForUser(userId, stock) {
        _.extend(stock, {
            userId: userId
        });
        allStocks[allStocks.length] = stock;

        return stock;
    }

    function findAllStocksForUser(userId) {
        return _.filter(allStocks, {
            userId: userId
        });
    }

    function deleteStockById(stockId) {
        _.remove(allStocks, function(stock) {
            return stock._id === stockId;
        });

        return allStocks;
    }

    function updateStockById(stockId, updatedStock) {
        var stockToUpdate = _.find(allStocks, {
            _id: stockId
        });

        _.extend(stockToUpdate, updatedStock);

        return stockToUpdate;
    }

    return {
        createStockForUser: createStockForUser,
        findAllStocksForUser: findAllStocksForUser,
        deleteStockById: deleteStockById,
        updateStockById: updateStockById
    };
};