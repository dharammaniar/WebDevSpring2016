/**
 * Created by dharam on 3/16/2016.
 */
'use strict';

module.exports = function(_, app, model) {

    app.post('/api/assignment/user', function (req, res) {
        var newUser = req.body;
        console.log(newUser);
        var allUsers = model.create(newUser);
        res.json(allUsers);
    });

    app.get('/api/assignment/user', function (req, res) {
        var allUsers = model.findAll();
        res.json(allUsers);
    });

    app.get('/api/assignment/user/:id', function (req, res) {
        var id = req.params.id;
        console.log(index);
        var user = model.findById(id);
        res.json(user);
    });

    app.get('/api/assignment/user/username?username=username', function (req, res) {
        var user = model.findUserByUsername(req.param.username);
        res.json(user ? user : null);
    });

    app.get('/api/assignment/user/username?username=username&password=password', function (req, res) {
        var credential = req.body;
        console.log(credential);
        var user = model.findUserByCredentials({
            username: req.param.username,
            password: req.param.password
        });
        res.json(user);
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