/**
 * Created by dharam on 3/31/2016.
 */
var mongoose = require('mongoose');

module.exports = function() {

    var FieldSchema = require('./field.schema.server.js')(mongoose);

    return mongoose.Schema({
        userId: String,
        title: {
            type: String,
            default: 'New Form'
        },
        fields: [FieldSchema],
        created: {
            type: Date,
            default: Date.now
        }
    });
};