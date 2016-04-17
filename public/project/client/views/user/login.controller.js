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
            UserService.login({
                username: user.username,
                password: user.password
            }).then(function successCallback(response) {
                $rootScope.user = response.data;
                $location.path('/profile/'+response.data._id);
            });
        }
    }
}());