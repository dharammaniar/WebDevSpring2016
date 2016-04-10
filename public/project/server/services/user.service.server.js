/**
 * @author dharam
 */
'use strict';

module.exports = function(app, model) {

    app.get('/api/project/usersession', findLoggedInUser);
    app.post('/api/project/user', createUser);
    app.delete('/api/project/usersession', deleteUserSession);
    app.get('/api/project/user/:id', getUserById);
    app.get('/api/project/user', getUser);
    app.put('/api/project/user/:id', updateUser);

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
        }
    }

    function updateUser(req, res) {
        model
            .update(req.params.id, req.body)
            .then(
                function(stats) {
                    req.session.loggedInUser = req.body;
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

};