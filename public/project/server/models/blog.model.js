/**
 * @author dharam
 */
'use strict';

var mongoose = require('mongoose');
var q = require('q');
var _ = require('lodash');

module.exports = function() {

    var BlogSchema = require('./blog.schema.server')();
    var Blog = mongoose.model('Blog', BlogSchema);

    function getMongooseModel() {
        return Blog;
    }

    function create(blog) {
        var deferred = q.defer();
        Blog.create(blog, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findById(id) {
        return Blog.findById(id);
    }

    function findAllBlogsForUser(userId) {
        var deferred = q.defer();
        Blog.find(
            {userId: userId},
            function(err, blogs) {
                if (!err) {
                    deferred.resolve(blogs);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function findAll() {
        var deferred = q.defer();
        Blog.find(
            function(err, blogs) {
                if (!err) {
                    deferred.resolve(blogs);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function update(id, blog) {
        var deferred = q.defer();
        delete blog._id;
        Blog.update(
            {_id: id},
            {$set: blog},
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

    function deleteBlog(id) {
        var deferred = q.defer();
        Blog
            .remove (
                {_id: id},
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

    return {
        findById: findById,
        findAllBlogsForUser: findAllBlogsForUser,
        findAll: findAll,
        create: create,
        update: update,
        deleteBlog: deleteBlog,
        getMongooseModel: getMongooseModel
    }
};