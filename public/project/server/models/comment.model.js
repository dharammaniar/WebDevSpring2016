/**
 * Created by dharam on 3/25/2016.
 */
'use strict';

module.exports = function(_) {

    var allComments = require('./comment.mock.json');

    function createCommentForUser(userId, comment) {
        _.extend(comment, {
            userId: userId,
            dateCreated: (new Date)
        });
        allComments[allComments.length] = comment;

        return comment;
    }

    function findAllCommentsForUser(userId) {
        return _.filter(allComments, {
            userId: userId
        });
    }

    function deleteCommentById(commentId) {
        _.remove(allComments, function(comment) {
            return comment._id === commentId;
        });

        return allComments;
    }

    function updateCommentById(commentId, updatedComment) {
        var commentToUpdate = _.find(allComments, {
            _id: commentId
        });

        _.extend(commentToUpdate, updatedComment);

        return commentToUpdate;
    }

    return {
        createCommentForUser: createCommentForUser,
        findAllCommentsForUser: findAllCommentsForUser,
        deleteCommentById: deleteCommentById,
        updateCommentById: updateCommentById
    };
};