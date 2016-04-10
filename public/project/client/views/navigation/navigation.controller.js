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
            UserService.logout()
                .then(function(response){
                    if (response.status == 200) {
                        $location.path('/');
                    }
                }, function(err) {
                    console.log(err);
                });
            
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
