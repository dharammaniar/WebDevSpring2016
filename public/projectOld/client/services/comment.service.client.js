'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('CommentService', CommentService);

    function CommentService($http) {

        function createCommentForUser(userId, comment) {
            return $http.post('/api/projectOld/comment/' + userId, comment);
        }

        function findAllCommentsForUser(userId) {
            return $http.get('/api/projectOld/comment/' + userId);
        }

        function deleteCommentById(commentId) {
            return $http.delete('/api/projectOld/comment/' + commentId);
        }

        function updateCommentById(commentId, updatedComment) {
            return $http.put('/api/projectOld/comment/' + commentId, updatedComment);
        }

        return {
            createCommentForUser: createCommentForUser,
            findAllCommentsForUser: findAllCommentsForUser,
            deleteCommentById: deleteCommentById,
            updateCommentById: updateCommentById
        };
    }
}());