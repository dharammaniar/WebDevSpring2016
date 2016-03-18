/**
 * Created by dharam on 3/17/2016.
 */
'use strict';

module.exports = function(_, app, model) {

    app.get('/api/assignment/form/:formId/field', function (req, res) {
        var form = model.findById(req.param.formId);
        res.json(form ? form.fields : null);
    });

    app.get('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
        var form = model.findFieldByFormIdAndFieldId(req.param.formId, req.param.fieldId);
        res.json(form);
    });

    app.delete('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
        var form = model.deleteFieldByFormIdAndFieldId(req.param.formId, req.param.fieldId);
        res.json(form);
    });

    app.post('/api/assignment/form/:formId/field', function (req, res) {
        var newField = req.body;
        // TODO Replace with node-uuid
        newField._id = 'uuid';
        console.log(newField);
        var form = model.createFieldInForm(req.param.formId, newField);
        res.json(form);
    });

    app.put('/api/assignment/form/:formId/field/:fieldId', function (req, res) {
        var form = model.updateFieldInForm(req.params.formId, req.params.fieldId, req.body);
        res.json(form);
    });
};