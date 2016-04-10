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
            model
                .findMatchingStocks(searchTerm)
                .then(
                    function(stocks) {
                        res.json(stocks);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        } else if (req.query.code) {
            var code = req.query.code;
            model.findStockByCode(code)
                .then(
                    function(stock) {
                        res.json(stock);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                )
        } else {
            model
                .findAll()
                .then(
                    function(stocks) {
                        res.json(stocks);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }
};