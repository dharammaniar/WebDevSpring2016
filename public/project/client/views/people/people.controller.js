/**
 * @author dharam
 */
'use strict';
(function () {
    angular
        .module('PortManApp')
        .controller('PeopleController', PeopleController);

    function PeopleController($rootScope, UserService) {
        var vm = this,
            self = $rootScope.user;

        vm.follow = follow;
        vm.unfollow = unfollow;

        function init() {
            vm.analystsIFollow = [];
            vm.analystsToFollow = [];

            UserService.findAllUsers()
                .then(
                    function (users) {
                        processFollowsForUser(users);
                    }, function (err) {
                        console.log(err);
                    }
                );
        }

        init();

        function processFollowsForUser(users) {
            _.forEach(users.data, function (user) {
                if (user._id === self._id) {
                    return;
                }
                if (user.type === 'analyst') {
                    if (self.followedUsers.indexOf(user._id) > -1) {
                        vm.analystsIFollow.push(user);
                    } else {
                        vm.analystsToFollow.push(user);
                    }
                }
            });
        }

        function follow(user) {
            self.followedUsers.push(user._id);
            UserService.updateUser(self._id, self)
                .then(
                    function (response) {
                        init();
                    },
                    function (error) {
                        console.log(error);
                    }
                );
        }

        function unfollow(user) {
            _.pull(self.followedUsers, user._id);
            UserService.updateUser(self._id, self)
                .then(
                    function (response) {
                        init();
                    },
                    function (error) {
                        console.log(error);
                    }
                );
        }

    }

})();
