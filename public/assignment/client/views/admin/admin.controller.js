'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .controller('AdminController', AdminController);

    function AdminController(UserService) {
        var vm = this;

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.sortByUsername = sortByUsername;
        vm.sortByFirstName = sortByFirstName;
        vm.sortByLastName = sortByLastName;

        function init() {
            setAllSortOrderToFalse();
            UserService.findAllUsers()
                .then(
                    function (response) {
                        var allUsers = response.data;
                        _.forEach(allUsers, function(user) {
                            user.roles = user.roles.toString();
                        });
                        vm.allUsers = allUsers;
                        delete vm.selectedUser;
                        delete vm.selectedUserIndex;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }
        init();

        function addUser(user) {
            UserService.createUser(user)
                .then(
                    function(resposne) {
                        init();
                    },
                    function (err){
                        console.log(err);
                    }
                );
        }

        function updateUser(user) {
            UserService.updateUserAdmin(user._id, user)
                .then(
                    function(response) {
                        init();
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }

        function deleteUser(user) {
            UserService.deleteUserById(user._id)
                .then(
                    function(response) {
                        init();
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }

        function selectUser(index) {
            vm.selectedUser = vm.allUsers[index];
            vm.selectedUserIndex = index;
        }

        function setAllSortOrderToFalse() {
            vm.usernameAscending = false;
            vm.usernameDescending = false;
            vm.firstNameAscending = false;
            vm.firstNameDescending = false;
            vm.lastNameAscending = false;
            vm.lastNameDescending = false;
        }

        function sortByUsername() {
            var allUsers = vm.allUsers;
            allUsers = _.sortBy(allUsers, function(user) {
                return user.username;
            });
            if (vm.usernameAscending) {
                _.reverse(allUsers);
                setAllSortOrderToFalse();
                vm.usernameDescending = true;

            } else {
                setAllSortOrderToFalse();
                vm.usernameAscending = true;
            }
            vm.allUsers = allUsers;
        }

        function sortByFirstName() {
            var allUsers = vm.allUsers;
            allUsers = _.sortBy(allUsers, function(user) {
                return user.firstName;
            });
            if (vm.firstNameAscending) {
                _.reverse(allUsers);
                setAllSortOrderToFalse();
                vm.firstNameDescending = true;

            } else {
                setAllSortOrderToFalse();
                vm.firstNameAscending = true;
            }
            vm.allUsers = allUsers;
        }

        function sortByLastName() {
            var allUsers = vm.allUsers;
            allUsers = _.sortBy(allUsers, function(user) {
                return user.lastName;
            });
            if (vm.lastNameAscending) {
                _.reverse(allUsers);
                setAllSortOrderToFalse();
                vm.lastNameDescending = true;

            } else {
                setAllSortOrderToFalse();
                vm.lastNameAscending = true;
            }
            vm.allUsers = allUsers;
        }

    }
}());