/**
 * Created by dharam on 3/16/2016.
 */
'use strict';

module.exports = function(_, app, model, uuid) {

    app.get('/api/assignment/user/:userId/form', function (req, res) {
        var form = model.findFormByUserId(req.params.userId);
        res.json(form);
    });

    app.get('/api/assignment/form/:formId', function (req, res) {
        var form = model.findById(req.params.formId);
        res.json(form);
    });

    app.delete('/api/assignment/form/:formId', function (req, res) {
        var allForms = model.deleteById(req.params.formId);
        res.json(allForms);
    });

    app.post('/api/assignment/user/:userId/form', function (req, res) {
        var newForm = req.body;
        newForm.userId = req.params.userId;
        newForm._id = uuid.v4();
        newForm.fields = [];
        console.log(newForm);
        var allForms = model.create(newForm);
        res.json(allForms);
    });

    app.put('/api/assignment/form/:formId', function (req, res) {
        var form = model.update(req.params.formId, req.body);
        res.json(form);
    });
};