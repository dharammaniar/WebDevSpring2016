/**
 * Created by dharam on 4/1/2016.
 */
'use strict';
var _ = require('lodash');

module.exports = function(formModel) {

    var Form = formModel.getMongooseModel();

    function findFieldsByFormId(formId) {
        return Form
            .findById(formId)
            .then(
                function(form) {
                    return form.fields;
                }
            );
    }

    function findFieldByFormIdAndFieldId(formId, fieldId) {
        return Form
            .findById(formId)
            .then(
                function(form) {
                    return form.fields.id(fieldId);
                }
            );
    }

    function deleteFieldByFormIdAndFieldId(formId, fieldId) {
        return Form
            .findById(formId)
            .then(
                function(form){
                    form.fields.id(fieldId).remove();
                    return form.save();
                }
            );
    }

    function createFieldInForm(formId, field) {
        return Form.findById(formId)
            .then(
                function(form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function updateFieldInForm(formId, fieldId, field) {
        return Form
            .findById(formId)
            .then(
                function(form){
                    var fieldToUpdate   = form.fields.id(fieldId);
                    _.extend(fieldToUpdate, field);
                    return form.save();
                }
            );
    }

    function updateFieldsInForm(formId, fields) {
        return Form
            .findById(formId)
            .then(
                function(form) {
                    form.fields = fields;
                    return form.save();
                }
            );
    }

    return {
        findFieldsByFormId: findFieldsByFormId,
        findFieldByFormIdAndFieldId: findFieldByFormIdAndFieldId,
        deleteFieldByFormIdAndFieldId: deleteFieldByFormIdAndFieldId,
        createFieldInForm: createFieldInForm,
        updateFieldInForm: updateFieldInForm,
        updateFieldsInForm: updateFieldsInForm
    }
};