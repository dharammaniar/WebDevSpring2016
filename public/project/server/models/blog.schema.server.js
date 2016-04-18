/**
 * @author dharam
 */
var mongoose = require('mongoose');

module.exports = function () {

    return mongoose.Schema({
        userId: String,
        title: String,
        text: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }, {collection: 'blog'});
};