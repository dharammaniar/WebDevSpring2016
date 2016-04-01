/**
 * Created by dharam on 3/31/2016.
 */
var mongoose = require('mongoose');

module.exports = function () {

    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String]
    }, {collection: 'user'});
};