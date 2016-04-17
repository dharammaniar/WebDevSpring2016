/**
 * @author dharam
 */
'use strict';
module.exports = function (mongoose) {

    return mongoose.Schema({
        userId: String,
        text: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }, {collection: 'comment'});
};