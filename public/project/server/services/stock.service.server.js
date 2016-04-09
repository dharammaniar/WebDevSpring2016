/**
 * @author dharam
 */
'use strict';

var _ = require('lodash');

module.exports = function(app, model) {

    app.get('/api/project/stock', getStocks);

    function getStocks(req, res) {
        if (req.query.searchTerm) {
            var searchTerm = req.query.searchTerm;
            var matchingStocks = model.findMatchingStocks(searchTerm);
            res.json(matchingStocks);
        } else {
            var stocks = model.getAllStocks();
            res.json(stocks);
        }
    }
};