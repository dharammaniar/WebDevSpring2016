/**
 * @author dharam
 */
'use strict';
(function(){
    angular
        .module('PortManApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($rootScope, $location, UserService) {
        var vm = this;
        vm.user = $rootScope.user;

        // Event Handler Declaration
        vm.update = update;
        vm.showSuccessAlert = false;

        // Event Handler Implementation
        function update(user) {
            UserService.updateUser(
                $rootScope.user._id,
                user
            ).then(function successCallback(response) {
                if (response.status === 200) {
                    $rootScope.user = user;
                    $location.path('/profile');
                    vm.showSuccessAlert = true;
                }
            });
        }
    }
})();
