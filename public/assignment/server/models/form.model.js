/**
 * Created by dharam on 3/15/2016.
 */
'use strict';

var mongoose = require('mongoose');
var q = require('q');

module.exports = function() {

    var FormSchema = require('./form.schema.server.js')();
    var Form = mongoose.model('Form', FormSchema);

    function getMongooseModel() {
        return Form;
    }

    function create(form) {
        var deferred = q.defer();
        Form.create(form, function (err, doc) {
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
        Form.find(
            function(err, forms) {
                if (!err) {
                    deferred.resolve(forms);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function findById(id) {
        return Form.findById(id);
    }

    function update(id, form) {
        var deferred = q.defer();
        Form.update(
            {_id: id},
            {$set: form},
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
        Form.remove(
            {_id:id},
            function(err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
    }

    function findFormByUserId(userId) {
        return Form.find({
            userId: userId
        });
    }

    function findFormByTitle(title) {
        return Form.findOne({
            title: title
        });
    }

    return {
        create: create,
        findAll: findAll,
        findById: findById,
        update: update,
        deleteById: deleteById,
        findFormByUserId: findFormByUserId,
        findFormByTitle: findFormByTitle,
        getMongooseModel: getMongooseModel
    }
};