'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('CommentService', CommentService);

    function CommentService() {
        var allComments = [
            {
                "_id": "1",
                "userId": 123,
                "text": "Example comment 1",
                "dateCreated": ""
            },
            {
                "_id": "2",
                "userId": 123,
                "text": "Example comment 2",
                "dateCreated": ""
            },
            {
                "_id": "3",
                "userId": 234,
                "text": "Example comment 1",
                "dateCreated": ""
            }
        ];

        function createCommentForUser(userId, comment, callback) {
            _.extend(comment, {
                _id: (new Date).getTime(),
                userId: userId,
                dateCreated: (new Date)
            });
            allComments[allComments.length] = comment;

            callback(comment);
        }

        function findAllCommentsForUser(userId, callback) {
            var commentsFound = _.filter(allComments, {
                userId: userId
            });

            callback(commentsFound);
        }

        function deleteCommentById(commentId, callback) {
            _.remove(allComments, function(comment) {
                return comment._id === commentId;
            });

            callback(allComments);
        }

        function updateCommentById(commentId, updatedComment, callback) {
            var commentToUpdate = _.find(allComments, {
                _id: commentId
            });

            _.extend(commentToUpdate, updatedComment);

            callback(commentToUpdate);
        }

        return {
            createCommentForUser: createCommentForUser,
            findAllCommentsForUser: findAllCommentsForUser,
            deleteCommentById: deleteCommentById,
            updateCommentById: updateCommentById
        };
    }
}());