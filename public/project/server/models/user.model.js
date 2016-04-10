/**
 * @author dharam
 */
'use strict';

var mongoose = require('mongoose');
var q = require('q');

module.exports = function() {

    var UserSchema = require('./user.schema.server.js')();
    var ProjectUser = mongoose.model('ProjectUser', UserSchema);

    function create(user) {
        var deferred = q.defer();
        ProjectUser.create(user, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findById(id) {
        return ProjectUser.findById(id);
    }

    function update(id, user) {
        var deferred = q.defer();
        delete user._id;
        ProjectUser.update(
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

    function findUserByUsername(username) {
        return ProjectUser.findOne({
            username: username
        });
    }

    function findUserByCredentials(credentials) {
        return ProjectUser.findOne({
            username: credentials.username,
            password: credentials.password
        });
    }

    return {
        create: create,
        findById: findById,
        update: update,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    }

};