'use strict';

(function(){
    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($location, $rootScope, UserService) {

        var vm = this;
        vm.logout = logout;

        function logout() {
            $rootScope.user = null;
            UserService.deleteUserSession();
            $location.url('/');
        }
    }
})();
