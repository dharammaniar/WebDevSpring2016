/**
 * @author dharam
 */
var mongoose = require('mongoose');

module.exports = function () {

    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String
    }, {collection: 'projectUser'});
};