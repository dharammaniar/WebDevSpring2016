/**
 * @author dharam
 */
'use strict';

(function(){
    angular
        .module('PortManApp')
        .controller('NavigationController', NavigationController);

    function NavigationController($rootScope, $location, $route) {
        var vm = this;

        vm.findStock = findStock;

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
