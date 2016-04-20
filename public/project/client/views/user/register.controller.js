/**
 * @author dharam
 */
'use strict';
(function(){
    angular
        .module('PortManApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        var vm = this;

        // Event Handler Declaration
        vm.register = register;

        // Event Handler Implementation
        function register(user) {
            var isValidated = true;

            $('#form-firstName').removeClass('has-error');
            $('#form-lastName').removeClass('has-error');
            $('#form-username').removeClass('has-error');
            $('#form-password').removeClass('has-error');
            $('#form-email').removeClass('has-error');

            if(!user) {
                $('#form-firstName').addClass('has-error');
                $('#form-lastName').addClass('has-error');
                $('#form-username').addClass('has-error');
                $('#form-password').addClass('has-error');
                $('#form-email').addClass('has-error');
                isValidated = false;
            } else {
                if (!user.firstName || (user.firstName === '')) {
                    $('#form-firstName').addClass('has-error');
                    isValidated = false;
                }
                if (!user.lastName || (user.lastName === '')) {
                    $('#form-lastName').addClass('has-error');
                    isValidated = false;
                }
                if (!user.username || (user.username === '')) {
                    $('#form-username').addClass('has-error');
                    isValidated = false;
                }
                if (!user.password || (user.password === '')) {
                    $('#form-password').addClass('has-error');
                    isValidated = false;
                }
                if (!user.email || (user.email === '')) {
                    $('#form-email').addClass('has-error');
                    isValidated = false;
                }
            }
            if (!isValidated) {
                return;
            }
            UserService.register({
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }).then(function(response) {
                if (response.data === 'Username Exists') {
                    $('#form-username').addClass('has-error');
                    vm.usernameExists = true;
                } else {
                    $rootScope.user = response.data;
                    $location.path('/profile/' + response.data._id);
                }
            }, function(err) {
                console.log(err);
            });
        }
    }
})();
