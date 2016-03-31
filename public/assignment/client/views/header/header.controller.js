'use strict';

(function(){
    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;

        $scope.logout = logout;

        function logout() {
            $rootScope.user = null;
            UserService.deleteUserSession();
            $location.path('/');
        }
    }
})();
