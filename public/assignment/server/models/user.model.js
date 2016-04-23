/**
 * Created by dharam on 3/15/2016.
 */
'use strict';

var mongoose = require('mongoose');
var q = require('q');

module.exports = function() {

    var UserSchema = require('./user.schema.server.js')();
    var User = mongoose.model('User', UserSchema);

    function create(user) {
        var deferred = q.defer();
        User.create(user, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAll() {
        var deferred = q.defer();
        User.find(
            function(err, users) {
                if (!err) {
                    deferred.resolve(users);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function findById(id) {
        return User.findById(id);
    }

    function update(id, user) {
        var deferred = q.defer();
        delete user._id;
        User.update(
            {_id: id},
            {$set: user},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function deleteById(id) {
        var deferred = q.defer();
        User.remove(
            {_id:id},
            function(err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function findUserByUsername(username) {
        return User.findOne({
            username: username
        });
    }

    function findUserByCredentials(credentials) {
        return User.findOne({
            username: credentials.username,
            password: credentials.password
        });
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