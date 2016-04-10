/**
 * @author dharam
 */
'use strict';

module.exports = function(app, model) {
  
    app.get('/api/project/user/:userId/portfolio', findPortfolioByUserId);
    app.get('/api/project/user/:userId/portfolio/:stockId', findPortfolioStockByStockIdAndUserId);
    app.delete('/api/project/user/:userId/portfolio/:stockId', deletePortfolioStockByIdAndUserId);
    app.post('/api/project/user/:userId/portfolio', addStockToUserPortfolio);
    app.put('/api/project/user/:userId/portfolio/:stockId', updatePortfolioStockInUser);

    function findPortfolioByUserId(req, res) {
        model.findPortfolioByUserId(req.params.userId)
            .then(
                function(portfolio) {
                    res.json(portfolio);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findPortfolioStockByStockIdAndUserId(req, res) {
        model.findPortfolioStockByStockIdAndUserId(req.params.userId, req.params.stockId)
            .then(
                function(stock) {
                    res.json(stock);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deletePortfolioStockByIdAndUserId(req, res) {
        model.deletePortfolioStockByIdAndUserId(req.params.userId, req.params.stockId)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function addStockToUserPortfolio(req, res) {
        var stock = req.body;
        model.addStockToUserPortfolio(req.params.userId, stock)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updatePortfolioStockInUser(req, res) {
        var stock = req.body;
        model.updatePortfolioStockInUser(req.params.userId, req.params.stockId, stock)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }
};