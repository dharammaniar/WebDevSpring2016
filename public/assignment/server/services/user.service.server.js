/**
 * Created by dharam on 3/16/2016.
 */
'use strict';

module.exports = function(_, app, model, uuid) {

    app.post('/api/assignment/user', function (req, res) {
        var newUser = req.body;
        newUser._id = uuid.v4();
        var user = model.create(newUser);
        res.json(user);
    });

    app.get('/api/assignment/user/:id', function (req, res) {
        var id = req.params.id;
        console.log(id);
        var user = model.findById(id);
        res.json(user);
    });

    app.get('/api/assignment/user', function (req, res) {
        var result = null;
        if (req.query.username && req.query.password) {
            result = model.findUserByCredentials({
                username: req.query.username,
                password: req.query.password
            });
            res.json(result);
        } else if (req.query.username) {
            result = model.findUserByUsername(req.query.username);
            res.json(result);
        } else {
            result = model.findAll();
            res.json(result);
        }

    });

    app.put('/api/assignment/user/:id', function (req, res) {
        var user = model.update(req.params.id, req.body);
        res.json(user);
    });

    app.delete('/api/assignment/user/:id', function (req, res) {
        var allUsers = model.deleteById(req.params.id);
        res.json(allUsers);
    });
};