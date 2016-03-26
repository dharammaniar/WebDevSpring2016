/**
 * Created by dharam on 3/25/2016.
 */
'use strict';

module.exports = function(_, app, model, uuid) {

    app.post('/api/project/portfolio/:userId', createStockForUser);
    app.get('/api/project/portfolio/:userId', findAllStocksForUser);
    app.delete('/api/project/portfolio/:stockId', deleteStockById);
    app.put('/api/project/portfolio/:stockId', updateStockById);

    function createStockForUser(req, res) {
        var userId = req.params.userId;
        var stock = req.body;
        stock._id = uuid.v4();
        var createdStock =  model.createStockForUser(userId, stock);
        res.json(createdStock);
    }

    function findAllStocksForUser(req, res) {
        var userId = req.params.userId;
        var allStocksForUser = model.findAllStocksForUser(userId);
        res.json(allStocksForUser);
    }

    function deleteStockById(req, res) {
        var stockId = req.params.stockId;
        var allStocks = model.deleteStockById(stockId);
        res.json(allStocks);
    }

    function updateStockById(req, res) {
        var stockId = req.params.stockId;
        var stock = req.body;
        var updatedStock = model.updateStockById(stockId, stock);
        res.json(updatedStock);
    }

};