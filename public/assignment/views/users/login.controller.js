(function() {
    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {

        // Event Handler Declaration
        $scope.login = login;

        // Event Handler Implementation
        function login(username, password) {
            UserService.findUserByCredentials(
                username,
                password,
                function(loggedInUser) {
                    $rootScope.user = loggedInUser;
                    $location.path('/profile');
                }
            )
        }
    }
}());