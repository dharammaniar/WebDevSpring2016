'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($rootScope, $location, UserService, PortfolioService, CommentService) {

        var vm = this;
        
        // Event Handler Declaration
        vm.update = update;
        vm.showSuccessAlert = false;

        showAllStocksForUser();
        showAllCommentsForUser();

        // Event Handler Implementation
        function update(user) {
            UserService.updateUser($rootScope.user._id, user)
                .then(
                    function(updatedUser) {
                        $rootScope.user = updatedUser.data;
                        $location.path('/profile');
                        vm.showSuccessAlert = true;
                    }
                );
        }

        function showAllStocksForUser() {
            PortfolioService.findAllStocksForUser($rootScope.user._id)
                .then(function(comments){
                    vm.userStocks = comments.data;
                    delete vm.selectedStock;
                    delete vm.selectedStockIndex;
                });
        }

        function showAllCommentsForUser() {
            CommentService.findAllCommentsForUser($rootScope.user._id)
                .then(function(comments){
                    vm.userComments = comments.data;
                    delete vm.selectedComment;
                    delete vm.selectedCommentIndex;
                });
        }
    }
}());