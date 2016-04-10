/**
 * @author dharam
 */
'use strict';
module.exports = function (mongoose) {

    return mongoose.Schema({
        code: String,
        invDate: {
            type: Date,
            default: Date.now
        },
        quantity: String,
        invPrice: String
    }, {collection: 'portfolioStocks'});
};