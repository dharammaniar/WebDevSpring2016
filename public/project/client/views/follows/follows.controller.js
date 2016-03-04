'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('FollowsController', FollowsController);

    function FollowsController($rootScope, $scope, FollowsService) {

        $scope.userFollows = [];
        showAllFollowsForUser();

        function showAllFollowsForUser() {
            FollowsService.findAllFollowsForUser($rootScope.user.username, function(follows){
                $scope.userFollows = follows;
                delete $scope.selectedFollows;
                delete $scope.selectedFollowsIndex;
            });
        }

        // Event Handler Declaration
        $scope.addFollows = addFollows;
        $scope.updateFollows = updateFollows;
        $scope.deleteFollows = deleteFollows;
        $scope.selectFollows = selectFollows;

        //Event Handler Implementation
        function addFollows(follows) {
            if (follows.user1username && follows.user2username) {
                FollowsService.createFollowsForUser(follows, showAllFollowsForUser);
            }
        }

        function updateFollows(follows) {
            FollowsService.updateFollowById(follows._id, follows, showAllFollowsForUser);
        }

        function deleteFollows(follows) {
            FollowsService.deleteFollowsById(follows._id, showAllFollowsForUser);
        }

        function selectFollows(index) {
            $scope.selectedFollowsIndex = index;
            $scope.selectedFollows = {
                _id: $scope.userFollows[index]._id,
                user1username: $scope.userFollows[index].user1username,
                user2username: $scope.userFollows[index].user2username
            }
        }
    }
}());