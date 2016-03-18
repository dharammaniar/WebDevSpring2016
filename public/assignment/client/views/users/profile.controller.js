'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {

        // Event Handler Declaration
        $scope.update = update;
        $scope.showSuccessAlert = false;

        // Event Handler Implementation
        function update(user) {
            UserService.updateUser(
                $rootScope.user._id,
                user
            ).then(function successCallback(response) {
                $rootScope.user = response.data;
                $location.path('/profile');
                $scope.showSuccessAlert = true;
            });
        }
    }
}());