'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService, PortfolioService, CommentService) {

        // Event Handler Declaration
        $scope.update = update;
        $scope.showSuccessAlert = false;

        showAllStocksForUser();
        showAllCommentsForUser();

        // Event Handler Implementation
        function update(user) {
            UserService.updateUser($rootScope.user._id, user)
                .then(
                    function(updatedUser) {
                        $rootScope.user = updatedUser.data;
                        $location.path('/profile');
                        $scope.showSuccessAlert = true;
                    }
                );
        }

        function showAllStocksForUser() {
            PortfolioService.findAllStocksForUser($rootScope.user._id)
                .then(function(comments){
                    $scope.userStocks = comments.data;
                    delete $scope.selectedStock;
                    delete $scope.selectedStockIndex;
                });
        }

        function showAllCommentsForUser() {
            CommentService.findAllCommentsForUser($rootScope.user._id)
                .then(function(comments){
                    $scope.userComments = comments.data;
                    delete $scope.selectedComment;
                    delete $scope.selectedCommentIndex;
                });
        }
    }
}());