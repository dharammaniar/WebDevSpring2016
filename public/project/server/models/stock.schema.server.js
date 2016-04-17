/**
 * @author dharam
 */
var mongoose = require('mongoose');

module.exports = function () {

    var CommentsSchema = require('./comments.schema.server')(mongoose);

    return mongoose.Schema({
        code: String,
        company: String,
        messages: [CommentsSchema]
    }, {collection: 'stock'});
};