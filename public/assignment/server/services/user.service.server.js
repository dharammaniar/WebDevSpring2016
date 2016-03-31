/**
 * Created by dharam on 3/16/2016.
 */
'use strict';

module.exports = function(_, app, model, uuid) {

    app.post('/api/assignment/user', function (req, res) {
        var newUser = req.body;
        //newUser._id = uuid.v4();
        model.create(newUser)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    });

    app.get('/api/assignment/user/:id', function (req, res) {
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
    });

    app.get('/api/assignment/user', function (req, res) {
        var result = null;
        if (req.query.username && req.query.password) {
            model
                .findUserByCredentials({
                    username: req.query.username,
                    password: req.query.password
                })
                .then(
                    function(user) {
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

    });

    app.put('/api/assignment/user/:id', function (req, res) {
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
    });

    app.delete('/api/assignment/user/:id', function (req, res) {
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
    });
};