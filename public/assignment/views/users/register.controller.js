(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

        // Event Handler Declaration
        $scope.register = register;

        // Event Handler Implementation
        function register(user) {
            UserService.createUser({
                username: user.username,
                password: user.password,
                email: user.email
            }, function(user) {
                $rootScope.user = user;
                $location.path('/profile');
            });
        }
    }
}());