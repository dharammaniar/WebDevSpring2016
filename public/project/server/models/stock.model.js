/**
 * @author dharam
 */
'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var q = require('q');

module.exports = function() {

    var StockSchema = require('./stock.schema.server.js')();
    var Stock = mongoose.model('Stock', StockSchema);

    function findAll() {
        var deferred = q.defer();
        Stock.find(
            function(err, users) {
                if (!err) {
                    deferred.resolve(users);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function findMatchingStocks(searchTerm) {
        var deferred = q.defer();

        findAll().then(
            function (response) {
                deferred.resolve(
                    _.filter(response, function (stock) {
                        return stock.code.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
                            || stock.company.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
                    })
                )
            }, function (err) {
                deferred.reject(err);
            }
        );

        return deferred.promise;
    }

    return {
        findAll: findAll,
        findMatchingStocks: findMatchingStocks
    };
};