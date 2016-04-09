/**
 * @author dharam
 */
var mongoose = require('mongoose');

module.exports = function () {

    return mongoose.Schema({
        code: String,
        company: String
    }, {collection: 'stock'});
};