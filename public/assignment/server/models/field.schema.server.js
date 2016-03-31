/**
 * Created by dharam on 3/31/2016.
 */
var mongoose = require('mongoose');

module.exports = function () {

    var FieldSchema = mongoose.Schema({
        label: String,
        type: {
            type: String,
            default: 'TEXT',
            enum:[
                'TEXT',
                'TEXTAREA',
                'EMAIL',
                'PASSWORD',
                'OPTIONS',
                'DATE',
                'RADIOS',
                'CHECKBOXES'
            ]},
        placeholder: String,
        options: {
            label: String,
            value: String
        }
    }, {collection: 'field'});

    return FieldSchema;
};