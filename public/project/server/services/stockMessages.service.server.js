/**
 * @author dharam
 */
'use strict';

module.exports = function(app, model) {

    app.get('/api/project/stock/:stockCode/messages', findMessagesByStock);
    app.get('/api/project/stock/:stockCode/messages/:messageId', findMessageByIdAndStockCode);
    app.delete('/api/project/stock/:stockCode/messages/:messageId', deleteMessageByIdAndStockCode);
    app.post('/api/project/stock/:stockCode/messages', addMessageToStockMessages);
    app.put('/api/project/stock/:stockCode/messages/:messageId', updateMessageInStockMessages);

    function findMessagesByStock(req, res) {
        model.findMessagesByStock(req.params.stockCode)
            .then(
                function(messages) {
                    res.json(messages);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findMessageByIdAndStockCode(req, res) {
        model.findMessageByIdAndStockCode(req.params.stockCode, req.params.messageId)
            .then(
                function(message) {
                    res.json(message);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMessageByIdAndStockCode(req, res) {
        model.deleteMessageByIdAndStockCode(req.params.stockCode, req.params.messageId)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function addMessageToStockMessages(req, res) {
        var message = req.body;
        model.addMessageToStockMessages(req.params.stockCode, message)
            .then(
                function(stock) {
                    res.json(stock);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateMessageInStockMessages(req, res) {
        var message = req.body;
        model.updateMessageInStockMessages(req.params.stockCode, req.params.messageId, message)
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