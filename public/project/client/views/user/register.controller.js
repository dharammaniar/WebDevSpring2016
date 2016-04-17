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
            UserService.register({
                username: user.username,
                password: user.password,
                email: user.email
            }).then(function successCallback(response) {
                $rootScope.user = response.data;
                $location.path('/profile/'+response.data._id);
            });
        }
    }
})();
