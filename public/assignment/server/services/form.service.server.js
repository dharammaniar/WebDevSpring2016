/**
 * Created by dharam on 3/16/2016.
 */
'use strict';

module.exports = function(app, model) {

    app.get('/api/assignment/user/:userId/form', findFormsByUserId);
    app.get('/api/assignment/form/:formId', findFormById);
    app.delete('/api/assignment/form/:formId', deleteFormById);
    app.post('/api/assignment/user/:userId/form', createFormForUser);
    app.put('/api/assignment/form/:formId', updateFormById);

    function findFormsByUserId(req, res) {
        model
            .findFormByUserId(req.params.userId)
            .then(
                function(forms) {
                    res.json(forms)
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormById(req, res) {
        model
            .findById(req.params.formId)
            .then(
                function(form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res) {
        model
            .deleteById(req.params.formId)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormForUser(req, res) {
        var newForm = req.body;
        newForm.userId = req.params.userId;
        newForm.fields = [];

        model
            .create(newForm)
            .then(
                function(form) {
                    res.json(form);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {
        model
            .update(req.params.formId, req.body)
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