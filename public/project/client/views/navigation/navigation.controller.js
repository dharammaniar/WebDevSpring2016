/**
 * @author dharam
 */
'use strict';

(function(){
    angular
        .module('PortManApp')
        .controller('NavigationController', NavigationController);

    function NavigationController($rootScope, $location, $route, UserService) {
        var vm = this;

        vm.findStock = findStock;
        vm.logout = logout;

        function logout() {
            $rootScope.user = null;
            UserService.deleteUserSession();
            $location.path('/');
        }

        function findStock(searchTerm) {
            $rootScope.searchTerm = searchTerm;
            vm.stock = '';
            if ($location.$$path === '/searchResults') {
                $route.reload();
            } else {
                $location.path('/searchResults');
            }
        }

    }
})();
