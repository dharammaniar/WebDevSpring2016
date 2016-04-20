/**
 * @author dharam
 */
'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var _ = require('lodash');

module.exports = function(app, model, upload) {

    app.get('/api/project/user/:id', getUserById);
    app.get('/api/project/user', getUser);
    app.put('/api/project/user/:id', updateUser);
    app.post('/api/project/user/profilePic/:id', upload.single('file'), updateProfilePic);

    var auth = authorized;
    app.post  ('/api/project/login', passport.authenticate('local'), login);
    app.post  ('/api/project/logout',         logout);
    app.get   ('/api/project/loggedin',       loggedin);
    app.post  ('/api/project/register',       register);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        model
            .findUserByCredentials({
                username: username,
                password: password
            })
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findById(user._id)
            .then(
                function(user){
                    delete user.password;
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }

    function register (req, res) {
        var userToCreate = req.body;
        model
            .findUserByUsername(userToCreate.username)
            .then(
                function(user){
                    if(user) {
                        res.json("Username Exists");
                    } else {
                        return model.create(userToCreate);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
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
                )
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

    function updateProfilePic(req, res) {
        var profilePic = req.file.path;
        model.updateProfilePic(req.params.id, profilePic.replace('public\/', '\/'))
            .then(
                function(stats) {
                    res.json(profilePic.replace('public\/', '\/'));
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

};