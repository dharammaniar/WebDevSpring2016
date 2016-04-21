/**
 * @author dharam
 */
var mongoose = require('mongoose');

module.exports = function () {

    var PortfolioStocksSchema = require('./portfolioStocks.schema.server')(mongoose);
    var CommentsSchema = require('./comments.schema.server')(mongoose);
    var RecommendationSchema = require('./recommendation.schema.server')(mongoose);

    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        profilePicUrl: {
            type: String,
            default: '\\uploads\\default_profile.jpg'
        },
        type: {
            type: String,
            default: 'investor',
            enum: ['investor', 'analyst']
        },
        followedUsers: [String],
        portfolioStocks: [PortfolioStocksSchema],
        portfolioComments: [CommentsSchema],
        recommendations: [RecommendationSchema]
    }, {collection: 'projectUser'});
};