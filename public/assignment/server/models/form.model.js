/**
 * Created by dharam on 3/15/2016.
 */
'use strict';

module.exports = function(_, app) {

    var allForms = require('./form.mock.json');

    app.get('/api/form', function (req, res) {
        res.json(allForms);
    });

    app.get('/api/form/:id', function (req, res) {
        var index = req.params.id;
        console.log(index);
        res.json(allForms[index]);
    });

    app.delete('/api/form/:id', function (req, res) {
        var index = req.params.id;
        allForms.splice(index, 1);
        res.json(allForms);
    });

    app.post('/api/form', function (req, res) {
        var newForm = req.body;
        console.log(newForm);
        allForms.push(newForm);
        res.json(allForms);
    });

    app.put('/api/form/:id', function (req, res) {
        var index = req.params.id;
        allForms[index] = req.body;
        res.json(allForms);
    });

    app.get('/api/form/title/:title', function (req, res) {
        var title = req.params.title;
        var form = _.find(allForms, {
            "title": title
        });
        res.json(form ? form : null);
    });
};