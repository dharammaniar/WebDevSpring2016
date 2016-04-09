'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('FollowsController', FollowsController);

    function FollowsController($rootScope, FollowsService) {

        var vm = this;
        
        vm.userFollows = [];
        showAllFollowsForUser();

        function showAllFollowsForUser() {
            FollowsService.findAllFollowsForUser($rootScope.user.username)
                .then(function(follows){
                    vm.userFollows = follows.data;
                    delete vm.selectedFollows;
                    delete vm.selectedFollowsIndex;
                });
        }

        // Event Handler Declaration
        vm.addFollows = addFollows;
        vm.updateFollows = updateFollows;
        vm.deleteFollows = deleteFollows;
        vm.selectFollows = selectFollows;

        //Event Handler Implementation
        function addFollows(follows) {
            if (follows.user1username && follows.user2username) {
                FollowsService.createFollowsForUser(follows).then(showAllFollowsForUser);
            }
        }

        function updateFollows(follows) {
            FollowsService.updateFollowById(follows._id, follows).then(showAllFollowsForUser);
        }

        function deleteFollows(follows) {
            FollowsService.deleteFollowsById(follows._id).then(showAllFollowsForUser);
        }

        function selectFollows(index) {
            vm.selectedFollowsIndex = index;
            vm.selectedFollows = {
                _id: vm.userFollows[index]._id,
                user1username: vm.userFollows[index].user1username,
                user2username: vm.userFollows[index].user2username
            }
        }
    }
}());