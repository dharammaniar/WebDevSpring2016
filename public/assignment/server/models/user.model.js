/**
 * Created by dharam on 3/15/2016.
 */
'use strict';

module.exports = function(_, app) {

    var allUsers = require('./user.mock.json');

    app.get('/api/user', function (req, res) {
        res.json(allUsers);
    });

    app.get('/api/user/:id', function (req, res) {
        var index = req.params.id;
        console.log(index);
        res.json(allUsers[index]);
    });

    app.delete('/api/user/:id', function (req, res) {
        var index = req.params.id;
        allUsers.splice(index, 1);
        res.json(allUsers);
    });

    app.post('/api/user', function (req, res) {
        var newUser = req.body;
        console.log(newUser);
        allUsers.push(newUser);
        res.json(allUsers);
    });

    app.put('/api/user/:id', function (req, res) {
        var index = req.params.id;
        allUsers[index] = req.body;
        res.json(allUsers);
    });

    app.get('/api/user/username/:username', function (req, res) {
        var username = req.params.username;
        var user = _.find(allUsers, {
             "username": username
        });
        res.json(user ? user : null);
    });

    app.get('/api/user/credential/', function (req, res) {
        var credential = req.body;
        console.log(credential);
        var user = _.find(allUsers, {
            "username": credential.username,
            "password": credential.password
        });
        res.json(user);
    });
};