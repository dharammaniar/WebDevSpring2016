(function() {
    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {

        // Event Handler Declaration
        $scope.login = login;

        // Event Handler Implementation
        function login(user) {
            UserService.findUserByCredentials(
                user.username,
                user.password,
                function(loggedInUser) {
                    $rootScope.user = loggedInUser;
                    $location.path('/profile');
                }
            )
        }
    }
}());