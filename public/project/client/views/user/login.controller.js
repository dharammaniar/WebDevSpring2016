/**
 * @author dharam
 */
'use strict';
(function() {
    angular
        .module('PortManApp')
        .controller('LoginController', LoginController);

    function LoginController($rootScope, $location, UserService) {

        var vm = this;

        // Event Handler Declaration
        vm.login = login;

        // Event Handler Implementation
        function login(user) {
            UserService.findUserByCredentials(
                user.username,
                user.password
            ).then(function successCallback(response) {
                $rootScope.user = response.data;
                $location.path('/profile');
            });
        }
    }
}());