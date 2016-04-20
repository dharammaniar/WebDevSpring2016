/**
 * @author dharam
 */
'use strict';
module.exports = function (mongoose) {

    return mongoose.Schema({
        code: String,
        action: String,
        target: String,
        by: String
    }, {collection: 'recommendations'});
};