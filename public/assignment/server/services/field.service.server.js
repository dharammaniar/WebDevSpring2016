/**
 * Created by dharam on 3/17/2016.
 */
'use strict';

module.exports = function(app, model) {

    app.get('/api/assignment/form/:formId/field', findFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldByFormIdAndFieldId);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldByFormIdAndFieldId);
    app.post('/api/assignment/form/:formId/field', createFieldInForm);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFieldInForm);
    app.put('/api/assignment/form/:formId/field/', updateFieldsInForm);

    function findFieldsByFormId(req, res) {
        model
            .findFieldsByFormId(req.params.formId)
            .then(
                function(fields) {
                    res.json(fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldByFormIdAndFieldId(req, res) {
        model
            .findFieldByFormIdAndFieldId(req.params.formId, req.params.fieldId)
            .then(
                function(field) {
                    res.json(field);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldByFormIdAndFieldId(req, res) {
        model
            .deleteFieldByFormIdAndFieldId(req.params.formId, req.params.fieldId)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFieldInForm(req, res) {
        model
            .createFieldInForm(req.params.formId, req.body)
            .then(
                function(form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldInForm(req, res) {
        model
            .updateFieldInForm(req.params.formId, req.params.fieldId, req.body)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldsInForm(req, res) {
        model
            .updateFieldsInForm(req.params.formId, req.body)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};