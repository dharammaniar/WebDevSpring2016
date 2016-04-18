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

        vm.invalidLogin = false;

        // Event Handler Declaration
        vm.login = login;

        // Event Handler Implementation
        function login(user) {
            var isValidated = true;

            $('#form-username').removeClass('has-error');
            $('#form-password').removeClass('has-error');

            if(!user) {
                $('#form-username').addClass('has-error');
                $('#form-password').addClass('has-error');
                isValidated = false;
            } else {
                if (!user.username || (user.username === '')) {
                    $('#form-username').addClass('has-error');
                    isValidated = false;
                }
                if (!user.password || (user.password === '')) {
                    $('#form-password').addClass('has-error');
                    isValidated = false;
                }
            }
            if (!isValidated) {
                return;
            }

            UserService.login({
                username: user.username,
                password: user.password
            }).then(function(response) {
                $rootScope.user = response.data;
                $location.path('/profile/'+response.data._id);
            }, function(err) {
                vm.invalidLogin = true;
            });
        }
    }
}());