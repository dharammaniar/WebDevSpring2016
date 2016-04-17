/**
 * @author dharam
 */
var _ = require('lodash');

module.exports = function(projectUserModel, stockModel) {

    var ProjectUser = projectUserModel.getMongooseModel();
    var Stock = stockModel.getMongooseModel();

    function findCommentsByUserId(userId) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    return user.portfolioComments;
                }
            );
    }

    function findCommentByIdAndUserId(userId, commentId) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    return user.portfolioComments.id(commentId);
                }
            )
    }

    function deleteCommentByIdAndUserId(userId, commentId) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    user.portfolioComments.id(commentId).remove();
                    return user.save();
                }
            )
    }

    function addCommentToUserComments(userId, comment) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    user.portfolioComments.push(comment);
                    return user.save();
                }
            );
    }

    function updateCommentInUserComments(userId, commentId, comment) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    var commentToUpdate = user.portfolioComments.id(commentId);
                    _.extend(commentToUpdate, comment);
                    return user.save();
                }
            )
    }

    function findMessagesByStock(stockCode) {
        return Stock
            .findStockByCode(stockCode)
            .then(
                function(stock) {
                    return stock.messages;
                }
            );
    }

    function findMessageByIdAndStockCode(stockCode, messageId) {
        return Stock
            .findStockByCode(stockCode)
            .then(
                function(stock) {
                    return stock.messages.id(messageId);
                }
            )
    }

    function deleteMessageByIdAndStockCode(stockCode, messageId) {
        return Stock
            .findStockByCode(stockCode)
            .then(
                function(stock) {
                    stock.messages.id(messageId).remove();
                    return stock.save();
                }
            )
    }

    function addMessageToStockMessages(stockCode, message) {
        return Stock
            .findStockByCode(stockCode)
            .then(
                function(stock) {
                    stock.messages.push(message);
                    return stock.save();
                }
            );
    }

    function updateMessageInStockMessages(stockCode, messageId, message) {
        return Stock
            .findStockByCode(stockCode)
            .then(
                function(stock) {
                    var messageToUpdate = stock.messages.id(messageId);
                    _.extend(messageToUpdate, message);
                    return stock.save();
                }
            )
    }

    return {
        findCommentsByUserId: findCommentsByUserId,
        findCommentByIdAndUserId: findCommentByIdAndUserId,
        deleteCommentByIdAndUserId: deleteCommentByIdAndUserId,
        addCommentToUserComments: addCommentToUserComments,
        updateCommentInUserComments: updateCommentInUserComments,
        findMessagesByStock: findMessagesByStock,
        findMessageByIdAndStockCode: findMessageByIdAndStockCode,
        deleteMessageByIdAndStockCode: deleteMessageByIdAndStockCode,
        addMessageToStockMessages: addMessageToStockMessages,
        updateMessageInStockMessages: updateMessageInStockMessages
    }
};
