'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('CommentController', CommentController);

    function CommentController($rootScope, CommentService) {

        var vm = this;
        
        vm.userComments = [];
        showAllCommentsForUser();

        function showAllCommentsForUser() {
            CommentService.findAllCommentsForUser($rootScope.user._id)
                .then(function(comments){
                    vm.userComments = comments.data;
                    delete vm.selectedComment;
                    delete vm.selectedCommentIndex;
                });
        }

        // Event Handler Declaration
        vm.addComment = addComment;
        vm.updateComment = updateComment;
        vm.deleteComment = deleteComment;
        vm.selectComment = selectComment;

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
            vm.selectedCommentIndex = index;
            vm.selectedComment = {
                _id: vm.userComments[index]._id,
                text: vm.userComments[index].text,
                dateCreated: vm.userComments[index].dateCreated
            }
        }
    }
}());