(function() {
    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {

        // Event Handler Declaration
        $scope.update = update;

        // Event Handler Implementation
        function update(username, password, firstName, lastName, email) {
            UserService.updateUser(
                $rootScope.user._id,
                {
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                },
                function(updatedUser) {
                    $rootScope.user = updatedUser;
                    $location.path('/profile');
                }
            )
        }
    }
}());