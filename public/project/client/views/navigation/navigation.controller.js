/**
 * @author dharam
 */
'use strict';

(function(){
    angular
        .module('PortManApp')
        .controller('NavigationController', NavigationController);

    function NavigationController($rootScope, $location) {
        var vm = this;

        vm.findStock = findStock;

        function findStock(searchTerm) {
            $rootScope.searchTerm = searchTerm;
            $location.path('/searchResults');
        }

    }
})();
