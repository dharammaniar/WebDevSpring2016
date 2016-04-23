'use strict';

(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        var vm = this;

        // Event Handler Declaration
        vm.register = register;

        // Event Handler Implementation
        function register(user) {
            UserService.register({
                username: user.username,
                password: user.password,
                emails: user.emails.split(',')
            }).then(function successCallback(response) {
                $rootScope.user = response.data;
                $location.path('/profile');
            });
        }
    }
}());