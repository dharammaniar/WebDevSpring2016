'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($rootScope, $location, UserService) {

        var vm = this;

        // Event Handler Declaration
        vm.login = login;

        // Event Handler Implementation
        function login(user) {
            UserService.findUserByCredentials(user.username, user.password)
                .then(function(loggedInUser) {
                    $rootScope.user = loggedInUser.data;
                    $location.path('/profile');
                });
        }
    }
}());