/**
 * @author dharam
 */
'use strict';

(function(){
    angular
        .module('PortManApp')
        .controller('NavigationController', NavigationController);

    function NavigationController($rootScope, $location, $route, UserService, StockService) {
        var vm = this;

        $('#side-menu').metisMenu();

        vm.findStock = findStock;
        vm.logout = logout;

        vm.updateStocks = updateStocks;

        var allStocks = [''];
        vm.allStocks = [''];
        getAllStocks();

        function getAllStocks() {
            StockService.getAllStocks()
                .then(
                    function(response) {
                        var stocks = response.data;
                        _.forEach(stocks, function(stock) {
                            allStocks.push(stock.code + ' : ' + stock.company);
                        });
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }

        function updateStocks(searchTerm) {
            if (searchTerm.length > 0) {
                vm.allStocks = _.filter(allStocks, function (stock) {
                    return stock.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
                })
            }
        }

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

            if (searchTerm.indexOf(':') >= 0) {
                var stockCode = searchTerm.split(':')[0].trim();
                vm.stock = '';
                $location.path('/stock/' + stockCode);
            } else {
                $rootScope.searchTerm = searchTerm;
                vm.stock = '';
                if ($location.$$path === '/searchResults') {
                    $route.reload();
                } else {
                    $location.path('/searchResults');
                }
            }
        }

    }
})();
