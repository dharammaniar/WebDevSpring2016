/**
 * Created by dharam on 3/16/2016.
 */
'use strict';

module.exports = function(app, model) {

    app.get('/api/assignment/usersession', findLoggedInUser);
    app.delete('/api/assignment/usersession', deleteUserSession);
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user/:id', getUserById);
    app.get('/api/assignment/user', getUser);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);

    function findLoggedInUser(req, res) {
        res.json(req.session.loggedInUser);
    }

    function deleteUserSession(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function createUser(req, res) {
        var newUser = req.body;
        model.create(newUser)
            .then(
                function(user) {
                    req.session.loggedInUser = user;
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserById(req, res) {
        var id = req.params.id;
        model
            .findById(id)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUser(req, res) {
        if (req.query.username && req.query.password) {
            model
                .findUserByCredentials({
                    username: req.query.username,
                    password: req.query.password
                })
                .then(
                    function(user) {
                        req.session.loggedInUser = user;
                        res.json(user);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        } else if (req.query.username) {
            model
                .findUserByUsername(req.query.username)
                .then(
                    function(user) {
                        res.json(user);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            model
                .findAll()
                .then(
                    function(users) {
                        res.json(users);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function updateUser(req, res) {
        model
            .update(req.params.id, req.body)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        model
            .deleteById(req.params.id)
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