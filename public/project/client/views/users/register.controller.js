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
            UserService.createUser(user)
                .then(function(user) {
                    $rootScope.user = user.data;
                    $location.path('/profile');
                });
        }
    }
}());