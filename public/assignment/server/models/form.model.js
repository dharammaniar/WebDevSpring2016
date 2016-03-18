/**
 * Created by dharam on 3/15/2016.
 */
'use strict';

module.exports = function(_, app) {

    var allForms = require('./form.mock.json');

    function create(form) {
        if (!form) {
            return;
        }
        allForms.push(form);

        return allForms;
    }

    function findAll() {
        return allForms;
    }

    function findById(id) {
        return _.find(allForms, {
            _id: id
        });
    }

    function update(id, form) {

        var index = _.findIndex(allForms, {
                _id: id
            }),
            formToUpdate = allForms[index];

        _.extend(formToUpdate, form);

        allForms[index] = formToUpdate;
        return formToUpdate;
    }

    function deleteById(id) {
        _.remove(allForms, {
            _id: id
        });
        return allForms;
    }

    function findFormByUserId(userId) {
        var form = _.find(allForms, {
            userId: userId
        });

        return form ? form : null;
    }

    function findFormByTitle(title) {
        var form = _.find(allForms, {
            title: title
        });

        return form ? form : null;
    }

    function findFieldByFormIdAndFieldId(formId, fieldId) {
        var form = findById(formId);

        var field = _.find(form.fields, {
            _id: fieldId
        });

        return field ? field : null;
    }

    function deleteFieldByFormIdAndFieldId(formId, fieldId) {
        var form = findById(formId);

        if (!form) {
            return null;
        }

        _.remove(form.fields, {
            _id: fieldId
        });
        update(form._id, form);

        return form;
    }

    function createFieldInForm(formId, field) {
        var form = findById(formId);
        form.fields.push(field);
        update(form._id, form);

        return form;
    }

    function updateFieldInForm(formId, fieldId, field) {
        var form = findById(formId),

            fieldIndex = _.find(form.fields, {
                _id: fieldId
            }),
            fieldToUpdate = form.fields[fieldIndex];

        _.extend(fieldToUpdate, field);
        form.fields[fieldIndex] = fieldToUpdate;
        update(form._id, form);

        return form;
    }

    return {
        create: create,
        findAll: findAll,
        findById: findById,
        update: update,
        deleteById: deleteById,
        findFormByUserId: findFormByUserId,
        findFormByTitle: findFormByTitle,
        findFieldByFormIdAndFieldId: findFieldByFormIdAndFieldId,
        deleteFieldByFormIdAndFieldId: deleteFieldByFormIdAndFieldId,
        createFieldInForm: createFieldInForm,
        updateFieldInForm: updateFieldInForm
    }
};