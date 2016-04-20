/**
 * @author dharam
 */
'use strict';
(function () {
    angular
        .module('PortManApp')
        .factory('CommentService', CommentService);

    function CommentService($http) {

        return {
            findCommentsByUserId: findCommentsByUserId,
            findCommentByIdAndUserId: findCommentByIdAndUserId,
            deleteCommentByIdAndUserId: deleteCommentByIdAndUserId,
            addCommentToUserComments: addCommentToUserComments,
            updateCommentInUserComments: updateCommentInUserComments
        };

        function findCommentsByUserId(userId) {
            return $http.get('/api/project/user/' + userId + '/comments');
        }

        function findCommentByIdAndUserId(userId, commentId) {
            return $http.get('/api/project/user/' + userId + '/comments/' + commentId);
        }

        function deleteCommentByIdAndUserId(userId, commentId) {
            return $http.delete('/api/project/user/' + userId + '/comments/' + commentId);
        }

        function addCommentToUserComments(userId, comment) {
            return $http.post('/api/project/user/' + userId + '/comments', comment);
        }

        function updateCommentInUserComments(userId, commentId, comment) {
            return $http.put('/api/project/user/' + userId + '/comments/' + commentId, comment);
        }
    }
})();