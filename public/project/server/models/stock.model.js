/**
 * @author dharam
 */
'use strict';

var _ = require('lodash');

module.exports = function() {

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