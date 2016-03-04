'use strict';

(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

        // Event Handler Declaration
        $scope.register = register;

        // Event Handler Implementation
        function register(user) {
            UserService.createUser(user, function(user) {
                $rootScope.user = user;
                $location.path('/profile');
            });
        }
    }
}());