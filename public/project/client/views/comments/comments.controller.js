'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('CommentController', CommentController);

    function CommentController($rootScope, $scope, CommentService) {

        $scope.userComments = [];
        showAllCommentsForUser();

        function showAllCommentsForUser() {
            CommentService.findAllCommentsForUser($rootScope.user._id)
                .then(function(comments){
                    $scope.userComments = comments.data;
                    delete $scope.selectedComment;
                    delete $scope.selectedCommentIndex;
                });
        }

        // Event Handler Declaration
        $scope.addComment = addComment;
        $scope.updateComment = updateComment;
        $scope.deleteComment = deleteComment;
        $scope.selectComment = selectComment;

        //Event Handler Implementation
        function addComment(comment) {
            if (comment.text) {
                CommentService.createCommentForUser($rootScope.user._id, comment).then(showAllCommentsForUser);
            }
        }

        function updateComment(comment) {
            CommentService.updateCommentById(comment._id, comment).then(showAllCommentsForUser);
        }

        function deleteComment(comment) {
            CommentService.deleteCommentById(comment._id).then(showAllCommentsForUser);
        }

        function selectComment(index) {
            $scope.selectedCommentIndex = index;
            $scope.selectedComment = {
                _id: $scope.userComments[index]._id,
                text: $scope.userComments[index].text,
                dateCreated: $scope.userComments[index].dateCreated
            }
        }
    }
}());