/**
 * @author dharam
 */
var mongoose = require('mongoose');

module.exports = function () {

    var PortfolioStocksSchema = require('./portfolioStocks.schema.server')(mongoose);

    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        portfolioStocks: [PortfolioStocksSchema]
    }, {collection: 'projectUser'});
};