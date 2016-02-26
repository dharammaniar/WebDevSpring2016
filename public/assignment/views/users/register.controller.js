(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

        // Event Handler Declaration
        $scope.register = register;

        // Event Handler Implementation
        function register(username, password, email) {
            UserService.createUser({
                username: username,
                password: password,
                email: email
            }, function(user) {
                $rootScope.user = user;
                $location.path('/profile');
            });
        }
    }
}());