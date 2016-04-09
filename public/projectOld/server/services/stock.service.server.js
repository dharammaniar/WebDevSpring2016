/**
 * Created by dharam on 3/25/2016.
 */
'use strict';

module.exports = function(_, app, model) {

    app.get('/api/projectOld/stock', getStocks);

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