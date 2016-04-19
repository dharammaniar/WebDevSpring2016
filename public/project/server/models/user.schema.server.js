/**
 * @author dharam
 */
var mongoose = require('mongoose');

module.exports = function () {

    var PortfolioStocksSchema = require('./portfolioStocks.schema.server')(mongoose);
    var CommentsSchema = require('./comments.schema.server')(mongoose);

    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        profilePicUrl: String,
        type: {
            type: String,
            default: 'investor',
            enum: ['investor', 'analyst']
        },
        followedUsers: [String],
        portfolioStocks: [PortfolioStocksSchema],
        portfolioComments: [CommentsSchema]
    }, {collection: 'projectUser'});
};