/**
 * Created by dharam on 3/25/2016.
 */
'use strict';

module.exports = function(_) {

    var stocks = require('./stock.mock.json');

    function getAllStocks() {
        return stocks;
    }

    function findMatchingStocks(searchTerm) {
        return _.filter(stocks, function (stock) {
            return stock.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
        });
    }

    return {
        getAllStocks: getAllStocks,
        findMatchingStocks: findMatchingStocks
    };
};