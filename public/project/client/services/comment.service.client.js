'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('CommentService', CommentService);

    function CommentService($http) {

        function createCommentForUser(userId, comment) {
            return $http.post('/api/project/comment/' + userId, comment);
        }

        function findAllCommentsForUser(userId) {
            return $http.get('/api/project/comment/' + userId);
        }

        function deleteCommentById(commentId) {
            return $http.delete('/api/project/comment/' + commentId);
        }

        function updateCommentById(commentId, updatedComment) {
            return $http.put('/api/project/comment/' + commentId, updatedComment);
        }

        return {
            createCommentForUser: createCommentForUser,
            findAllCommentsForUser: findAllCommentsForUser,
            deleteCommentById: deleteCommentById,
            updateCommentById: updateCommentById
        };
    }
}());