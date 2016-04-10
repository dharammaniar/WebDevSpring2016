/**
 * @author dharam
 */
var _ = require('lodash');

module.exports = function(projectUserModel) {

    var ProjectUser = projectUserModel.getMongooseModel();
    
    function findPortfolioByUserId(userId) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    return user.portfolioStocks;
                }
            );
    }

    function findPortfolioStockByStockIdAndUserId(userId, stockId) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    return user.portfolioStocks.id(stockId);
                }
            )
    }

    function deletePortfolioStockByIdAndUserId(userId, stockId) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    user.portfolioStocks.id(stockId).remove();
                    return user.save();
                }
            )
    }

    function addStockToUserPortfolio(userId, stock) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    user.portfolioStocks.push(stock);
                    return user.save();
                }
            );
    }

    function updatePortfolioStockInUser(userId, stockId, stock) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    var stockToUpdate = user.portfolioStocks.id(stockId);
                    _.extend(stockToUpdate, stock);
                    return user.save();
                }
            )
    }

    return {
        findPortfolioByUserId: findPortfolioByUserId,
        findPortfolioStockByStockIdAndUserId: findPortfolioStockByStockIdAndUserId,
        deletePortfolioStockByIdAndUserId: deletePortfolioStockByIdAndUserId,
        addStockToUserPortfolio: addStockToUserPortfolio,
        updatePortfolioStockInUser: updatePortfolioStockInUser
    }
};
