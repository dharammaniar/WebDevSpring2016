/**
 * Created by dharam on 3/25/2016.
 */
'use strict';

module.exports = function(_, app, model, uuid) {

    app.post('/api/projectOld/user', createUser);
    app.get('/api/projectOld/user/:id', findUserById);
    app.get('/api/projectOld/usersession', findLoggedInUser);
    app.delete('/api/projectOld/usersession', deleteUserSession);
    app.put('/api/projectOld/user/:id', updateUser);
    app.delete('/api/projectOld/user/:id', deleteUser);
    app.get('/api/projectOld/user', findUser);

    function createUser(req, res) {
        var newUser = req.body;
        newUser._id = uuid.v4();
        var user = model.create(newUser);
        req.session.loggedInUser = user;
        res.json(user);
    }

    function findLoggedInUser(req, res) {
        res.json(req.session.loggedInUser);
    }

    function deleteUserSession(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function findUserById(req, res) {
        var id = req.params.id;
        var user = model.findById(id);
        res.json(user);
    }

    function findUser(req, res) {
        var result = null;
        if (req.query.username && req.query.password) {
            result = model.findUserByCredentials({
                username: req.query.username,
                password: req.query.password
            });
            req.session.loggedInUser = result;
            res.json(result);
        } else if (req.query.username) {
            result = model.findUserByUsername(req.query.username);
            res.json(result);
        } else {
            result = model.findAll();
            res.json(result);
        }
    }

    function updateUser(req, res) {
        var user = model.update(req.params.id, req.body);
        req.session.loggedInUser = user;
        res.json(user);
    }

    function deleteUser(req, res) {
        var allUsers = model.deleteById(req.params.id);
        res.json(allUsers);
    }
};