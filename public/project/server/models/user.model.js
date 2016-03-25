/**
 * Created by dharam on 3/25/2016.
 */
'use strict';

module.exports = function(_) {

    var allUsers = require('./user.mock.json');

    function create(user) {
        if (!user) {
            return;
        }
        allUsers.push(user);

        return user;
    }

    function findAll() {
        return allUsers;
    }

    function findById(id) {
        return _.find(allUsers, function(user) {
            return user._id == id;
        });
    }

    function update(id, user) {

        var index = _.findIndex(allUsers, function(user) {
                return user._id == id;
            }),
            userToUpdate = allUsers[index];

        _.extend(userToUpdate, user);

        allUsers[index] = userToUpdate;
        return userToUpdate;
    }

    function deleteById(id) {
        _.remove(allUsers, {
            '_id': id
        });
        return allUsers;
    }

    function findUserByUsername(username) {
        var user = _.find(allUsers, {
            "username": username
        });

        return user ? user : null;
    }

    function findUserByCredentials(credentials) {
        var user = _.find(allUsers, {
            "username": credentials.username,
            "password": credentials.password
        });

        return user ? user : null;
    }

    return {
        create: create,
        findAll: findAll,
        findById: findById,
        update: update,
        deleteById: deleteById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    }
};