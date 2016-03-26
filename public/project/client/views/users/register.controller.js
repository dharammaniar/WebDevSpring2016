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
            UserService.createUser(user)
                .then(function(user) {
                    $rootScope.user = user.data;
                    $location.path('/profile');
                });
        }
    }
}());